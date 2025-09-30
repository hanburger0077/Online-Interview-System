package com.exam.system.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.exam.system.entity.User;

/**
 * 用户服务接口
 * 
 * @author exam-system
 * @since 2025-10-01
 */
public interface UserService extends IService<User> {

    /**
     * 根据用户名查询用户
     * 
     * @param username 用户名
     * @return 用户信息
     */
    User getUserByUsername(String username);

    /**
     * 用户注册
     * 
     * @param user 用户信息
     * @return 是否成功
     */
    boolean register(User user);
}