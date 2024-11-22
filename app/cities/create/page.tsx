"use client"
import React, {useState, useEffect} from 'react';
import {Tabs, Tab, Input, Button, Card, CardBody} from "@nextui-org/react";
import {PlusIcon} from '@/app/components/PlusIcon';
import {createCity} from '@/app/cities/(utils)/api/create'
import {City} from '@/app/cities/(utils)/types/city.type'
import {useRouter} from 'next/navigation'
import {checkIsAdmin} from "@/app/(auth)/(utils)/helpers/auth.helper";
import UnAuthorized from "@/app/components/UnAuthorized";

export default function CreateCity() {
    const [name, setName] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        setIsAdmin(checkIsAdmin())
    }, []);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const city: City | null = await createCity(name);
        if (city) {
            router.push('/cities')
        } else {
            setErrorMessage("City name is already exists");
        }
    };

    return (

        <div className="flex justify-center items-center h-screen">
            {
                !isAdmin ? <UnAuthorized/> :
                    <Card className="max-w-full w-[340px] h-[200px]">
                        <CardBody className="overflow-hidden">
                            <Tabs fullWidth size="md" aria-label="Tabs form">
                                <Tab key="city" title="Create new City">
                                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                                        <Input
                                            isRequired
                                            label="Name"
                                            placeholder="Enter city name"
                                            value={name}
                                            onChange={handleNameChange}
                                            type="text"
                                            errorMessage={errorMessage}
                                        />
                                        <div className="flex gap-2 justify-end">
                                            <Button fullWidth color="primary" type="submit">
                                                Create <PlusIcon width={undefined} height={undefined}/>
                                            </Button>
                                        </div>
                                    </form>
                                </Tab>
                            </Tabs>
                        </CardBody>
                    </Card>
            }
        </div>
    );
}

