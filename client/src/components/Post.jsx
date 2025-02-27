import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, Button } from "@chakra-ui/react";
import LayoutHelmet from './LayoutHelmet';
const Post = () => {

    return (
        <LayoutHelmet title={"Post"} description={"this is Post"}>
            <div className='my-8 w-full max-w-sm mx-auto'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <Avatar name="Rohit Patil" src="https://bit.ly/sage-adebayo" />
                        <h1>username</h1>
                    </div>
                    <Demo />
                </div>
                <img src="https://bit.ly/sage-adebayo" alt="" />
            </div>
        </LayoutHelmet>
    );
};

export default Post;



const Demo = () => {
    return (
        <DialogRoot>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    Open Dialog
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Dialog Title</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </DialogBody>
                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogActionTrigger>
                    <Button>Save</Button>
                </DialogFooter>
                <DialogCloseTrigger />
            </DialogContent>
        </DialogRoot>
    )
}
