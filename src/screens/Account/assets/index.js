import {colorCancel, colorEffect} from '../../../config/System';

export const statusProfile = {
    "default": {
        "color": colorCancel,
        "name": 'Chưa tạo'
    },
    "processing": {
        "color": '#FEB404',
        "name": 'Đợi duyệt'
    },
    "approved": {
        "color": colorEffect,
        "name": 'Đã duyệt'
    },
    "rejected": {
        "color": colorCancel,
        "name": 'Bị từ chối'
    },
}