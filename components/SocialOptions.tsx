import { MessageCircleMore, Repeat, Send, ThumbsUp } from "lucide-react";
import { Button } from "./ui/button";

const SocialOptions = () => {
    return (
        <div className="flex justify-between items-center m-3">
            <Button variant={'ghost'}>
                <ThumbsUp/>
                <p>Like</p>
            </Button>
            <Button variant={'ghost'}>
                <MessageCircleMore/>
                <p>Message</p>
            </Button>
            <Button variant={'ghost'}>
                <Repeat/>
                <p>Repost</p>
            </Button>
            <Button variant={'ghost'}>
                <Send/>
                <p>Send</p>
            </Button>
        </div>
    )
}

export default SocialOptions;