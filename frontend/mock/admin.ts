/**
 * 管理员 Mock 数据
 */
import type { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

export default [
  // 创建房间
  {
    url: '/api/v1/admin/rooms',
    method: 'post',
    response: () => {
      return {
        code: 0,
        message: '创建成功',
        data: {
          id: Mock.Random.id(),
        },
      }
    },
  },
  // 获取房间列表
  {
    url: '/api/v1/admin/rooms',
    method: 'get',
    response: ({ query }: any) => {
      const { page = 1, pageSize = 10 } = query
      const rooms = Mock.mock({
        [`list|${pageSize}`]: [
          {
            id: '@id',
            title: '@ctitle(10, 20)',
            interviewerId: '@id',
            interviewerName: '@cname',
            capacity: '@integer(10, 30)',
            booked: '@integer(0, 20)',
            startAt: '@datetime',
            endAt: '@datetime',
            isRecording: '@boolean',
            'status|1': ['pending', 'in_progress', 'ended'],
            createdAt: '@datetime',
          },
        ],
      })

      return {
        code: 0,
        message: 'success',
        data: {
          list: rooms.list,
          total: 50,
          page: Number(page),
          pageSize: Number(pageSize),
        },
      }
    },
  },
  // 获取回放列表
  {
    url: '/api/v1/admin/recordings',
    method: 'get',
    response: ({ query }: any) => {
      const { page = 1, pageSize = 10 } = query
      const recordings = Mock.mock({
        [`list|${pageSize}`]: [
          {
            id: '@id',
            sessionId: '@id',
            url: 'https://example.com/recordings/@id.mp4',
            duration: '@integer(600, 3600)',
            createdAt: '@datetime',
            candidateName: '@cname',
            interviewerName: '@cname',
          },
        ],
      })

      return {
        code: 0,
        message: 'success',
        data: {
          list: recordings.list,
          total: 30,
          page: Number(page),
          pageSize: Number(pageSize),
        },
      }
    },
  },
  // 发布成绩
  {
    url: '/api/v1/admin/result/publish',
    method: 'post',
    response: ({ body }: any) => {
      return {
        code: 0,
        message: '发布成功',
        data: {
          success: true,
          count: body.length || 0,
        },
      }
    },
  },
  // 获取站内信列表
  {
    url: '/api/v1/admin/notices',
    method: 'get',
    response: ({ query }: any) => {
      const { page = 1, pageSize = 10 } = query
      const notices = Mock.mock({
        [`list|${pageSize}`]: [
          {
            id: '@id',
            title: '@ctitle(10, 30)',
            content: '@cparagraph',
            'type|1': ['system', 'interview', 'result'],
            createdAt: '@datetime',
            recipientCount: '@integer(10, 100)',
          },
        ],
      })

      return {
        code: 0,
        message: 'success',
        data: {
          list: notices.list,
          total: 40,
          page: Number(page),
          pageSize: Number(pageSize),
        },
      }
    },
  },
  // 发送站内信
  {
    url: '/api/v1/admin/notices',
    method: 'post',
    response: () => {
      return {
        code: 0,
        message: '发送成功',
        data: null,
      }
    },
  },
] as MockMethod[]
