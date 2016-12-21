import AV from 'avoscloud-sdk'

const ReportQuestion = AV.Object.extend('ReportQuestion')

/**
 * Class Methods
 */

ReportQuestion.fetchAll = function (page = 1, perPage = 15) {
    const query = new AV.Query(ReportQuestion)
    const countQuery = new AV.Query(ReportQuestion)

    query.include('reporter')
    query.include('question')
    query.include('question.user')
    query.include('question.asker')
    query.addDescending('createdAt')
    query.limit(perPage)
    query.skip(perPage * (page - 1))

    return AV.Promise.when(query.find(), countQuery.count())
}

ReportQuestion.fetchTodayReportedQuestionsCount = function () {
    const query = new AV.Query(ReportQuestion)
    const now = new Date()

    now.setHours(0, 0, 0, 0)
    query.greaterThan('createdAt', now)

    return query.count()
}

/**
 * Instance Methods
 */

export default ReportQuestion
