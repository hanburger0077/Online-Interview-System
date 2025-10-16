import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/v1/auth/login',
    method: 'post',
    response: ({ body }: any) => {
      const { username, password } = body

      const users: Record<string, any> = {
        admin: {
          id: '1',
          name: '管理员',
          role: 'admin',
          email: 'admin@example.com',
          avatar: 'https://ui-avatars.com/api/?name=Admin',
        },
        teacher: {
          id: '2',
          name: '张老师',
          role: 'interviewer',
          email: 'teacher@example.com',
          avatar: 'https://ui-avatars.com/api/?name=Teacher',
        },
        student: {
          id: '3',
          name: '李同学',
          role: 'candidate',
          email: 'student@example.com',
          avatar: 'https://ui-avatars.com/api/?name=Student',
        },
      }

      const user = users[username]

      if (user && password === '123456') {
        return {
          code: 0,
          message: '登录成功',
          data: {
            token: `mock_token_${username}_${Date.now()}`,
            user,
          },
        }
      }

      return {
        code: 401,
        message: '用户名或密码错误',
        data: null,
      }
    },
  },
  {
    url: '/api/v1/me',
    method: 'get',
    response: () => ({
      code: 0,
      message: 'success',
      data: {
        id: '1',
        name: '测试用户',
        role: 'candidate',
        email: 'test@example.com',
        avatar: 'https://ui-avatars.com/api/?name=User',
      },
    }),
  },
  {
    url: '/api/v1/auth/logout',
    method: 'post',
    response: () => ({
      code: 0,
      message: '登出成功',
      data: null,
    }),
  },
] as MockMethod[]
