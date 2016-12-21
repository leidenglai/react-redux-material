import React from 'react'
import moment from 'moment'

export function friendlyTime(time) {
    if (!time) {
        return ""
    }

    return (
        <span>{moment(time).format('YYYY-MM-DD HH:mm:ss')}</span>
    )
}

export function friendlyTimeWithLineBreak(time) {
    if (!time) {
        return ""
    }

    return (
        <span>
            {moment(time).format('YYYY-MM-DD')}
            <br/>
            {moment(time).format('HH:mm:ss')}
        </span>
    )
}

export function truncate(content, maxLength) {
    return content && content.length > maxLength ? content.substring(0, maxLength) + "..." : content
}
