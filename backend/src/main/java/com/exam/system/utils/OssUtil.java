package com.exam.system.utils;

import com.aliyun.oss.OSS;

import com.aliyun.oss.model.PutObjectRequest;
import com.aliyun.oss.model.PutObjectResult;
import com.exam.system.config.OssProperties;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

/**
 * 阿里云OSS文件上传工具类
 * 
 * @author exam-system
 * @since 2025-10-01
 */
@Slf4j
@Component
public class OssUtil {

    @Autowired
    private OSS ossClient;

    @Autowired
    private OssProperties ossProperties;

    /**
     * 上传文件
     * 
     * @param file   文件
     * @param folder 文件夹路径
     * @return 文件访问URL
     */
    public String uploadFile(MultipartFile file, String folder) {
        try {
            // 获取原始文件名
            String originalFilename = file.getOriginalFilename();
            if (originalFilename == null) {
                throw new RuntimeException("文件名不能为空");
            }

            // 生成唯一文件名
            String fileName = generateFileName(originalFilename);
            String objectName = folder + "/" + fileName;

            // 上传文件到OSS
            InputStream inputStream = file.getInputStream();
            PutObjectRequest putObjectRequest = new PutObjectRequest(
                    ossProperties.getBucketName(),
                    objectName,
                    inputStream);

            PutObjectResult result = ossClient.putObject(putObjectRequest);
            log.info("文件上传成功，ETag: {}", result.getETag());

            // 返回文件访问URL
            return "https://" + ossProperties.getBucketName() + "." +
                    ossProperties.getEndpoint().replace("https://", "") + "/" + objectName;

        } catch (IOException e) {
            log.error("文件上传失败", e);
            throw new RuntimeException("文件上传失败: " + e.getMessage());
        }
    }

    /**
     * 删除文件
     * 
     * @param objectName 文件对象名称
     */
    public void deleteFile(String objectName) {
        try {
            ossClient.deleteObject(ossProperties.getBucketName(), objectName);
            log.info("文件删除成功: {}", objectName);
        } catch (Exception e) {
            log.error("文件删除失败: {}", objectName, e);
            throw new RuntimeException("文件删除失败: " + e.getMessage());
        }
    }

    /**
     * 生成唯一文件名
     * 
     * @param originalFilename 原始文件名
     * @return 唯一文件名
     */
    private String generateFileName(String originalFilename) {
        String extension = "";
        int dotIndex = originalFilename.lastIndexOf(".");
        if (dotIndex > 0) {
            extension = originalFilename.substring(dotIndex);
        }
        return UUID.randomUUID().toString().replace("-", "") + extension;
    }
}