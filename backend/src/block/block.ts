export interface ImageBlock {
    id: string;
    height: number;
    width: number;
    src: string;
    timestamp: string;
}

export interface PartialImageBlock extends Partial<NewImageBlock> {
    [key: string]: any;
}

export interface NewImageBlock {
    height: number;
    width: number;
    src: string;
}

export interface TextBlock {
    id: string;
    type: string;
    content: string;
    timestamp: string;
}

export interface PartialTextBlock extends Partial<NewTextBlock> {
    [key: string]: any;
}

export interface NewTextBlock {
    type: string;
    content: string;
}

export type Block = ImageBlock | TextBlock;

