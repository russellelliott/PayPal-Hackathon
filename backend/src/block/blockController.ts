import {
    Body,
    Controller,
    Delete,
    Get,
    Patch,
    Post,
    Query,
    Response,
    Route,
    SuccessResponse,
} from 'tsoa';

import { Block, ImageBlock, NewImageBlock, TextBlock, NewTextBlock } from './block'; // Import imageblock related types
import { BlockService } from './blockService';

@Route('blocks')
export class BlockController extends Controller {
    @Get()
    @Response('401', 'Unauthorized')
    @Response('404', 'ImageBlock not found')
    public async getAll(): Promise<Block[] | ImageBlock> {
        return new BlockService().getAll();
    }

    @Get('/image')
    @Response('401', 'Unauthorized')
    @Response('404', 'ImageBlock not found')
    public async getImageBlocks(
        @Query() id?: string,
    ): Promise<ImageBlock[] | ImageBlock> {
        if (id) {
            return new BlockService().getImageBlockById(id);
        } else {
            return new BlockService().getAllImageBlocks();
        }
    }

    @Post('/image')
    @SuccessResponse('201', 'ImageBlock created')
    public async createImageBlock(
        @Body() imageBlock: NewImageBlock,
    ): Promise<ImageBlock | undefined> {
        return new BlockService().addImageBlock(imageBlock);
    }

    @Patch('/image')
    @Response('404', 'ImageBlock not found')
    @SuccessResponse('200', 'ImageBlock updated')
    public async updateImageBlock(
        @Body() imageBlock: Partial<NewImageBlock>,
        @Query('id') id: string,
    ): Promise<ImageBlock | undefined> {
        return new BlockService().getImageBlockById(id).then(
            async (found: ImageBlock | null): Promise<ImageBlock | undefined> => {
                if (!found) {
                    this.setStatus(404);
                } else {
                    return await new BlockService().updateImageBlock(id, imageBlock);
                }
            }
        );
    }

    @Delete('/image')
    @Response('404', 'ImageBlock does not exist')
    @SuccessResponse('204', 'ImageBlock deleted')
    public async deleteImageBlock(
        @Query('id') id: string,
    ): Promise<void> {
        return new BlockService().getImageBlockById(id).then(
            async (found: ImageBlock | null): Promise<void> => {
                if (!found) {
                    this.setStatus(404);
                } else {
                    await new BlockService().deleteImageBlock(id);
                    this.setStatus(204);
                }
            }
        );
    }


    @Get('/text')
    @Response('401', 'Unauthorized')
    @Response('404', 'TextBlock not found')
    public async getTextBlocks(
        @Query() id?: string,
    ): Promise<TextBlock[] | TextBlock> {
        if (id) {
            return new BlockService().getTextBlockById(id);
        } else {
            return new BlockService().getAllTextBlocks();
        }
    }

    @Post('/text')
    @SuccessResponse('201', 'TextBlock created')
    public async createTextBlock(
        @Body() textBlock: NewTextBlock,
    ): Promise<TextBlock | undefined> {
        return new BlockService().addTextBlock(textBlock);
    }

    @Patch('/text')
    @Response('404', 'TextBlock not found')
    @SuccessResponse('200', 'TextBlock updated')
    public async updateTextBlock(
        @Body() textBlock: Partial<NewTextBlock>,
        @Query('id') id: string,
    ): Promise<TextBlock | undefined> {
        return new BlockService().getTextBlockById(id).then(
            async (found: TextBlock | null): Promise<TextBlock | undefined> => {
                if (!found) {
                    this.setStatus(404);
                } else {
                    return await new BlockService().updateTextBlock(id, textBlock);
                }
            }
        );
    }

    @Delete('/text')
    @Response('404', 'TextBlock does not exist')
    @SuccessResponse('204', 'TextBlock deleted')
    public async deleteTextBlock(
        @Query('id') id: string,
    ): Promise<void> {
        return new BlockService().getTextBlockById(id).then(
            async (found: TextBlock | null): Promise<void> => {
                if (!found) {
                    this.setStatus(404);
                } else {
                    await new BlockService().deleteTextBlock(id);
                    this.setStatus(204);
                }
            }
        );
    }
}
