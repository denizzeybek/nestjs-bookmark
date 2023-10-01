import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
export declare class BookmarkController {
    private readonly bookmarkService;
    constructor(bookmarkService: BookmarkService);
    create(createBookmarkDto: CreateBookmarkDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateBookmarkDto: UpdateBookmarkDto): string;
    remove(id: string): string;
}
