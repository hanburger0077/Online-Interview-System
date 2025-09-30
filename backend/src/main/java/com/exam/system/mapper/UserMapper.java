package com.exam.system.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.exam.system.entity.User;
import org.apache.ibatis.annotations.Mapper;

/**
 * 用户Mapper接口
 * 
 * @author exam-system
 * @since 2025-10-01
 */
@Mapper
public interface UserMapper extends BaseMapper<User> {

}