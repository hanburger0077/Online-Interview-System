# 考试系统后端

## 项目介绍

基于Spring Boot 3.x + Java 17 + MySQL + Redis + MyBatis-Plus 的在线考试系统后端服务。

## 技术栈

- **语言**：Java 17
- **框架**：Spring Boot 3.1.5
- **数据库**：MySQL 8.0+
- **缓存**：Redis
- **ORM**：MyBatis-Plus 3.5.4.1
- **文件存储**：阿里云OSS
- **认证**：JWT
- **构建工具**：Maven

## 项目结构

```
src/
├── main/
│   ├── java/
│   │   └── com/
│   │       └── exam/
│   │           └── system/
│   │               ├── ExamSystemApplication.java    # 主启动类
│   │               ├── common/                       # 公共类
│   │               │   ├── Result.java              # 统一返回结果
│   │               │   └── GlobalExceptionHandler.java # 全局异常处理
│   │               ├── config/                       # 配置类
│   │               │   ├── MybatisPlusConfig.java   # MyBatis-Plus配置
│   │               │   ├── RedisConfig.java         # Redis配置
│   │               │   ├── OssConfig.java           # OSS配置
│   │               │   ├── OssProperties.java       # OSS属性配置
│   │               │   └── MyMetaObjectHandler.java # 字段自动填充
│   │               ├── controller/                   # 控制器
│   │               │   ├── UserController.java      # 用户控制器
│   │               │   └── HealthController.java    # 健康检查
│   │               ├── entity/                       # 实体类
│   │               │   ├── BaseEntity.java          # 基础实体
│   │               │   └── User.java                # 用户实体
│   │               ├── mapper/                       # Mapper接口
│   │               │   └── UserMapper.java          # 用户Mapper
│   │               ├── service/                      # 服务接口
│   │               │   ├── UserService.java         # 用户服务接口
│   │               │   └── impl/                     # 服务实现
│   │               │       └── UserServiceImpl.java # 用户服务实现
│   │               └── utils/                        # 工具类
│   │                   └── OssUtil.java             # OSS工具类
│   └── resources/
│       ├── application.yml                           # 主配置文件
│       ├── application-dev.yml                       # 开发环境配置
│       ├── application-prod.yml                      # 生产环境配置
│       └── exam_system.sql                          # 数据库初始化脚本
└── test/                                            # 测试代码
```

## 快速开始

### 1. 环境要求

- JDK 17+
- Maven 3.6+
- MySQL 8.0+
- Redis 6.0+

### 2. 数据库配置

1. 创建数据库并执行初始化脚本：
```sql
mysql -u root -p < src/main/resources/exam_system.sql
```

2. 修改 `application-dev.yml` 中的数据库连接信息：
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/exam_system_dev
    username: your_username
    password: your_password
```

### 3. Redis配置

修改 `application-dev.yml` 中的Redis连接信息：
```yaml
spring:
  data:
    redis:
      host: localhost
      port: 6379
      password: your_password
```

### 4. 阿里云OSS配置

修改 `application-dev.yml` 中的OSS配置：
```yaml
aliyun:
  oss:
    endpoint: your_endpoint
    access-key-id: your_access_key_id
    access-key-secret: your_access_key_secret
    bucket-name: your_bucket_name
```

### 5. 启动应用

```bash
mvn clean compile
mvn spring-boot:run
```

应用启动后访问：http://localhost:8080/api/health

## API文档

### 健康检查
- GET `/api/health` - 系统健康检查

### 用户管理
- POST `/api/user/register` - 用户注册
- GET `/api/user/{id}` - 根据ID查询用户
- PUT `/api/user` - 更新用户信息

## 默认账户

系统初始化后会创建以下默认账户（密码均为：123456）：

- 管理员：admin / 123456
- 教师：teacher / 123456  
- 学生：student / 123456

## 开发规范

1. 所有实体类继承 `BaseEntity`
2. 使用 `@TableField` 注解映射数据库字段
3. 控制器统一返回 `Result<T>` 类型
4. 使用 `@Slf4j` 注解记录日志
5. 异常统一由 `GlobalExceptionHandler` 处理

## 部署说明

1. 修改 `application-prod.yml` 配置
2. 使用环境变量配置敏感信息
3. 执行打包命令：`mvn clean package`
4. 运行：`java -jar target/exam-system-1.0.0.jar --spring.profiles.active=prod`

## 联系信息

如有问题，请联系开发团队。