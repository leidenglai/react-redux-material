import AV from 'avoscloud-sdk'

const InvitationCode = AV.Object.extend('InvitationCode')

/**
 * Class Methods
 */

InvitationCode.fetchAll = function (page = 1, perPage = 15) {
    const query = new AV.Query(InvitationCode)
    const countQuery = new AV.Query(InvitationCode)

    query.addDescending('createdAt')
    query.skip(perPage * (page - 1))
    query.limit(perPage)
    query.include('createdBy')
    query.include('user')

    return AV.Promise.when(query.find(), countQuery.count())
}

InvitationCode.generateCodes = function (count = 5) {
    return AV.Cloud.run('generateInvitationCodeByAdmin').then(function (codes) {
        return codes.map((code) => {
            // Convert pain Object to AV Object
            var object = AV.Object._create('InvitationCode')
            object._finishFetch(code, true)
            return object
        })
    })
}

/**
 * Instance Methods
 */

Object.assign(InvitationCode.prototype, {
    markSended(sendedTo){
        this.set('sended', true)
        this.set('sendedAt', new Date())
        this.set('sendedTo', sendedTo)

        return this.save()
    }
})

export default InvitationCode
