package com.exam.system.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.exam.system.entity.User;
import com.exam.system.mapper.UserMapper;
import com.exam.system.service.UserService;
import org.springframework.stereotype.Service;

/**
 * 用户服务实现类
 * 
 * @author exam-system
 * @since 2025-10-01
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

    @Override
    public User getUserByUsername(String username) {
        LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(User::getUsername, username);
        return this.getOne(queryWrapper);
    }

    @Override
    public boolean register(User user) {
        // 检查用户名是否已存在
        User existUser = getUserByUsername(user.getUsername());
        if (existUser != null) {
            throw new RuntimeException("用户名已存在");
        }

        // 设置默认值
        user.setUserType(3); // 默认学生
        user.setStatus(1); // 默认正常状态

        return this.save(user);
    }
}