import AV from 'avoscloud-sdk'
import QuestionComment from './QuestionComment'

const Question = AV.Object.extend('Question')

/**
 * Class Methods
 */

Question.fetchAll = function (page = 1, perPage = 15) {
    const query = new AV.Query(Question)
    const countQuery = new AV.Query(Question)

    query.limit(perPage)
    query.skip(perPage * (page - 1))
    query.include('asker')
    query.include('user')
    query.addDescending('createdAt')

    return AV.Promise.when(query.find(), countQuery.count())
}

Question.fetchPendingAnonymousQuestions = function (page = 1, perPage = 15) {
    const query = new AV.Query(Question)
    const countQuery = new AV.Query(Question)

    query.equalTo('anonymous', true)
    query.equalTo('answered', false)
    query.limit(perPage)
    query.skip(perPage * (page - 1))
    query.include('asker')
    query.include('user')
    query.addDescending('createdAt')

    countQuery.equalTo('anonymous', true)
    countQuery.equalTo('answered', false)

    return AV.Promise.when(query.find(), countQuery.count())
}

Question.fetchAnswers = function (page = 1, perPage = 15) {
    const query = new AV.Query(Question)
    const countQuery = new AV.Query(Question)

    query.equalTo('answered', true)
    query.limit(perPage)
    query.skip(perPage * (page - 1))
    query.include('asker')
    query.include('user')
    query.addDescending('answeredAt')

    countQuery.equalTo('answered', true)

    return AV.Promise.when(query.find(), countQuery.count())
}

Question.fetchTodayQuestionsCount = function () {
    const query = new AV.Query(Question)
    const now = new Date()

    now.setHours(0, 0, 0, 0)
    query.greaterThan('createdAt', now)

    return query.count()
}

Question.fetchTodayAnswersCount = function () {
    const query = new AV.Query(Question)
    const now = new Date()

    now.setHours(0, 0, 0, 0)
    query.greaterThan('answeredAt', now)

    return query.count()
}

/**
 * Instance Methods
 */

Object.assign(Question.prototype, {
    update(title) {
        this.set('title', title)
        return this.save()
    },

    fetchComments(page = 1, perPage = 15) {
        const query = new AV.Query(QuestionComment)

        query.equalTo('question', this)
        query.addAscending('createdAt')
        query.limit(perPage)
        query.skip(perPage * (page - 1))
        query.include('user')

        return query.find()
    }
})

export default Question
