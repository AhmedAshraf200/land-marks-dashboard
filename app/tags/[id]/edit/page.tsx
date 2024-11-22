'use client'
import React, {useEffect, useState} from 'react'
import {Tabs, Tab, Input, Button, Card, CardBody} from '@nextui-org/react'
import {EditIcon} from '@nextui-org/shared-icons'
import {findTagById} from '@/app/tags/(utils)/api/findById'
import {Tag} from '@/app/tags/(utils)/types/tag.type'
import {updateTag} from '@/app/tags/(utils)/api/update'
import {checkIsAdmin} from "@/app/(auth)/(utils)/helpers/auth.helper";
import UnAuthorized from "@/app/components/UnAuthorized";

// @ts-ignore
export default function EditTag({params}) {
    const [name, setName] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        setIsAdmin(checkIsAdmin())
        const fetchData = async () => {
            try {
                const tag: Tag = await findTagById(params.id);
                setName(tag.name);
            } catch (error) {
                console.error('Error fetching tag data:', error);
            }
        };

        fetchData();
    }, [params.id]);


    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const tag: Tag | null = await updateTag(params.id, name);
        if (tag) {
            // TODO: improve this
            window.location.href = '/tags';
        } else {
            setErrorMessage("Tag name is already exists");
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            {
                !isAdmin ? <UnAuthorized/> :
                    <Card className="max-w-full w-[340px] h-[200px]">
                        <CardBody className="overflow-hidden">
                            <Tabs fullWidth size="md" aria-label="Tabs form">
                                <Tab key="tag" title="Edit Tag">
                                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                                        <Input
                                            isRequired
                                            label="Name"
                                            placeholder="Enter tag name"
                                            value={name}
                                            onChange={handleNameChange}
                                            type="text"
                                            errorMessage={errorMessage}
                                        />
                                        <div className="flex gap-2 justify-end">
                                            <Button fullWidth color="primary" type="submit">
                                                Update <EditIcon/>
                                            </Button>
                                        </div>
                                    </form>
                                </Tab>
                            </Tabs>
                        </CardBody>
                    </Card>
            }
        </div>
    )
}
