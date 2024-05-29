import moment from 'moment'

export const diffMonth = (date,dateDiff, months) => {
    if (typeof months === 'undefined') return false
    return moment(date).diff(dateDiff, 'months') < months
}