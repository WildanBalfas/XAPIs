'use strict';

const ObjectId = require('mongodb').ObjectId;

module.exports = function(entity){
    if (entity.categoryId) {
        entity.categoryId = ObjectId(entity.categoryId);
    }
    if (entity.userId) {
        entity.userId = ObjectId(entity.userId);
    }
    if (entity.productId) {
        entity.productId = ObjectId(entity.productId);
    }
    if (entity.tableId) {
        entity.tableId = ObjectId(entity.tableId);
    }
    if (entity.waiterId) {
        entity.waiterId = ObjectId(entity.waiterId);
    }
    if (entity.reservationId) {
        entity.reservationId = ObjectId(entity.reservationId);
    }
    if (entity.createBy) {
        entity.createBy = ObjectId(entity.createBy);
    }
    if (entity.modifyBy) {
        entity.modifyBy = ObjectId(entity.modifyBy);
    }
}