export class ImageSet {
    // 800*600
    big: string;
    // 75*75
    thumbnail: string;
    // 400*300
    medium: string;
    // 200*150
    small: string;

}
export function getImages(images) {
        const imageSet: ImageSet[] = [];
        for (const prop in images) {
            const propImages: any = images[prop];
            const item = {} as ImageSet;
            for (const p in propImages) {
                switch (propImages[p].Width) {
                    case 75: {
                        item.thumbnail = propImages[p].Url;
                        break;
                    }
                    case 200: {
                        item.small = propImages[p].Url;
                        break;
                    }
                    case 400: {
                        item.medium = propImages[p].Url;
                        break;
                    }
                    case 640: {
                        item.big = propImages[p].Url;
                        break;
                    }
                    case 800: {
                        item.big = propImages[p].Url;
                        break;
                    }
                }
            }
            // console.log("image item:"+item);
            imageSet.push(item);
        }
        return imageSet;
    }
