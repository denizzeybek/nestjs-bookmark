import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
export declare class BookmarkService {
    create(createBookmarkDto: CreateBookmarkDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateBookmarkDto: UpdateBookmarkDto): string;
    remove(id: number): string;
}
