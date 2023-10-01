"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookmarkService = void 0;
const common_1 = require("@nestjs/common");
let BookmarkService = class BookmarkService {
    create(createBookmarkDto) {
        return 'This action adds a new bookmark';
    }
    findAll() {
        return `This action returns all bookmark`;
    }
    findOne(id) {
        return `This action returns a #${id} bookmark`;
    }
    update(id, updateBookmarkDto) {
        return `This action updates a #${id} bookmark`;
    }
    remove(id) {
        return `This action removes a #${id} bookmark`;
    }
};
exports.BookmarkService = BookmarkService;
exports.BookmarkService = BookmarkService = __decorate([
    (0, common_1.Injectable)()
], BookmarkService);
//# sourceMappingURL=bookmark.service.js.map