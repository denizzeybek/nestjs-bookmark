"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookmarkController = void 0;
const common_1 = require("@nestjs/common");
const bookmark_service_1 = require("./bookmark.service");
const create_bookmark_dto_1 = require("./dto/create-bookmark.dto");
const update_bookmark_dto_1 = require("./dto/update-bookmark.dto");
const decorator_1 = require("../auth/decorator");
const guard_1 = require("../auth/guard");
let BookmarkController = class BookmarkController {
    constructor(bookmarkService) {
        this.bookmarkService = bookmarkService;
    }
    getBookmarks(userId) {
        return this.bookmarkService.getBookmarks(+userId);
    }
    getBookmarkById(userId, bookmarkId) {
        return this.bookmarkService.getBookmarkById(+userId, +bookmarkId);
    }
    createBookmark(userId, createBookmarkDto) {
        return this.bookmarkService.createBookmark(+userId, createBookmarkDto);
    }
    editBookmarkById(userId, bookmarkId, updateBookmarkDto) {
        return this.bookmarkService.editBookmarkById(+userId, +bookmarkId, updateBookmarkDto);
    }
    deleteBookmarkById(userId, bookmarkId) {
        return this.bookmarkService.deleteBookmarkById(+userId, +bookmarkId);
    }
};
exports.BookmarkController = BookmarkController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, decorator_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BookmarkController.prototype, "getBookmarks", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, decorator_1.GetUser)('id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], BookmarkController.prototype, "getBookmarkById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, decorator_1.GetUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_bookmark_dto_1.CreateBookmarkDto]),
    __metadata("design:returntype", void 0)
], BookmarkController.prototype, "createBookmark", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, decorator_1.GetUser)('id')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, update_bookmark_dto_1.UpdateBookmarkDto]),
    __metadata("design:returntype", void 0)
], BookmarkController.prototype, "editBookmarkById", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.Delete)(':id'),
    __param(0, (0, decorator_1.GetUser)('id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], BookmarkController.prototype, "deleteBookmarkById", null);
exports.BookmarkController = BookmarkController = __decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Controller)('bookmark'),
    __metadata("design:paramtypes", [bookmark_service_1.BookmarkService])
], BookmarkController);
//# sourceMappingURL=bookmark.controller.js.map