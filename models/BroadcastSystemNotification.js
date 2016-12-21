import AV from 'avoscloud-sdk'
import UserNotification from './UserNotification'

const BroadcastSystemNotification = AV.Object.extend('BroadcastSystemNotification')

/**
 * Class Methods
 */

BroadcastSystemNotification.fetchAll = function (page = 1, perPage = 15) {
    const query = new AV.Query(BroadcastSystemNotification)

    //query.limit(perPage)
    //query.skip(perPage * (page - 1))
    query.addDescending('createdAt')

    return query.find()
}

BroadcastSystemNotification.push = function (content) {
    const query = new AV.Query(AV.User)

    // 若要发送给所有人, 则注释掉下一行
    //query.equalTo('objectId', "56713bcc60b2e41662ab72e6")
    return query.find().then(function (users) {
        const notifications = users.map((user) => {
            const notification = new UserNotification()

            notification.set('kind', 2)
            notification.set('content', content)
            notification.set('user', user)

            user.increment('unreadOtherNotificationsCount')
            user.save()

            return notification
        })

        return AV.Object.saveAll(notifications)
    }).then(function () {
        return AV.Push.send({
            data: {
                alert: content,
                badge: 'Increment',
                kind: '2'
            }
        });
    }).then(function () {
        const broadcastSystemNotifications = new BroadcastSystemNotification()

        broadcastSystemNotifications.set('content', content)
        return broadcastSystemNotifications.save()
    })
}

/**
 * Instance Methods
 */

export default BroadcastSystemNotification
