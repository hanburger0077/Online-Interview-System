/**
 * 面试 Mock 数据
 */
import type { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

export default [
  // 获取可预约时段
  {
    url: '/api/v1/interview/slots',
    method: 'get',
    response: () => {
      const slots = Mock.mock({
        'list|5-10': [
          {
            'id|+1': 1,
            startAt: () => Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
            endAt: () => Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
            interviewer: '@cname',
            'interviewerId|+1': 100,
            'capacity|10-30': 20,
            'booked|0-15': 5,
            'status|1': ['open', 'closed'],
          },
        ],
      })

      return {
        code: 0,
        message: 'success',
        data: slots.list,
      }
    },
  },
  // 预约时段
  {
    url: '/api/v1/interview/slots/:id/book',
    method: 'post',
    response: () => {
      return {
        code: 0,
        message: '预约成功',
        data: {
          success: true,
          reservationId: Mock.Random.id(),
        },
      }
    },
  },
  // 获取我的预约
  {
    url: '/api/v1/interview/my',
    method: 'get',
    response: () => {
      const reservations = Mock.mock({
        'list|2-5': [
          {
            id: '@id',
            sessionId: '@id',
            slotId: '@id',
            candidateId: '@id',
            candidateName: '@cname',
            interviewerId: '@id',
            interviewerName: '@cname',
            startAt: '@datetime',
            endAt: '@datetime',
            'status|1': ['pending', 'in_progress', 'ended'],
            createdAt: '@datetime',
          },
        ],
      })

      return {
        code: 0,
        message: 'success',
        data: reservations.list,
      }
    },
  },
  // 加入房间
  {
    url: '/api/v1/room/:sessionId/join',
    method: 'post',
    response: () => {
      return {
        code: 0,
        message: 'success',
        data: {
          sessionId: Mock.Random.id(),
          rtcToken: 'mock_rtc_token_' + Date.now(),
          iceServers: [
            {
              urls: 'stun:stun.l.google.com:19302',
            },
          ],
          role: 'candidate',
          isRecording: true,
        },
      }
    },
  },
  // 获取房间信息
  {
    url: '/api/v1/room/:sessionId',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'success',
        data: {
          id: Mock.Random.id(),
          title: '前端工程师面试 - 第1场',
          status: 'in_progress',
          startAt: Mock.Random.datetime(),
          endAt: Mock.Random.datetime(),
          participants: [
            {
              id: '1',
              name: '张老师',
              role: 'interviewer',
              avatar: 'https://ui-avatars.com/api/?name=Teacher',
            },
            {
              id: '2',
              name: '李同学',
              role: 'candidate',
              avatar: 'https://ui-avatars.com/api/?name=Student',
            },
          ],
        },
      }
    },
  },
  // 获取房间题目
  {
    url: '/api/v1/room/:sessionId/questions',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'success',
        data: [
          {
            id: '1',
            stem: '请简述 Vue 3 的响应式原理',
            attachments: [],
          },
          {
            id: '2',
            stem: '请解释闭包的概念，并举例说明其应用场景',
            attachments: [],
          },
          {
            id: '3',
            stem: '如何优化前端性能？请列举至少5种方法',
            attachments: [],
          },
        ],
      }
    },
  },
] as MockMethod[]

