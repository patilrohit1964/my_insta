import React, { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Avatar, Button, useDisclosure } from "@chakra-ui/react";
import LayoutHelmet from './LayoutHelmet';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/modal";

const Post = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <LayoutHelmet title={"Post"} description={"this is Post"}>
            <div className='my-8 w-full max-w-sm mx-auto'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <Avatar name="Rohit Patil" src="https://bit.ly/sage-adebayo" />
                        <h1>username</h1>
                    </div>

                    {/* Clickable Icon to Open Dialog */}
                    <MoreHorizontal size="24px" cursor="pointer" onClick={onOpen} />

                    {/* Chakra UI Modal */}
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Action</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                </div>

                <img src="https://bit.ly/sage-adebayo" alt="" />
            </div>
        </LayoutHelmet>
    );
};

export default Post;
