package com.exam.system.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 用户实体类
 * 
 * @author exam-system
 * @since 2025-10-01
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("sys_user")
public class User extends BaseEntity {

    /**
     * 用户名
     */
    @TableField("username")
    private String username;

    /**
     * 密码
     */
    @TableField("password")
    private String password;

    /**
     * 姓名
     */
    @TableField("real_name")
    private String realName;

    /**
     * 邮箱
     */
    @TableField("email")
    private String email;

    /**
     * 手机号
     */
    @TableField("phone")
    private String phone;

    /**
     * 用户类型：1-管理员，2-教师，3-学生
     */
    @TableField("user_type")
    private Integer userType;

    /**
     * 用户状态：1-正常，0-禁用
     */
    @TableField("status")
    private Integer status;

    /**
     * 头像地址
     */
    @TableField("avatar")
    private String avatar;
}