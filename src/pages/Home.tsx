import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { getAddressByCep } from "../services/cepService";
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonButton,
    IonList,
    IonItem,
    IonLabel,
} from "@ionic/react";

interface FormValues {
    cep: string;
}

interface Address {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
}

const Home: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const [address, setAddress] = useState<Address | null>(null);
    const [error, setError] = useState<string | null>(null);

    const onSubmit: SubmitHandler<FormValues> = async ({ cep }) => {
        try {
            setError(null); 
            const fetchedAddress = await getAddressByCep(cep);
            setAddress(fetchedAddress);
        } catch (err) {
            setError(error);
            setAddress(null);
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Consulta de CEP</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <IonItem>
                        <IonLabel position="floating">Digite o CEP</IonLabel>
                        <IonInput
                            type="text"
                            {...register("cep", { required: "CEP é obrigatório", pattern: /^\d{5}-?\d{3}$/ })}
                        />
                    </IonItem>
                    {errors.cep && <p style={{ color: "red" }}>{errors.cep.message}</p>}
                    <IonButton expand="block" type="submit">Pesquisar Endereço</IonButton>
                </form>

                {error && <p style={{ color: "red" }}>{error}</p>}

                {address && (
                    <IonList>
                        <IonItem>
                            <IonLabel>
                                <strong>CEP:</strong> {address.cep}
                            </IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel>
                                <strong>Logradouro:</strong> {address.logradouro}
                            </IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel>
                                <strong>Complemento:</strong> {address.complemento}
                            </IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel>
                                <strong>Bairro:</strong> {address.bairro}
                            </IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel>
                                <strong>Cidade:</strong> {address.localidade} - {address.uf}
                            </IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel>
                                <strong>DDD:</strong> {address.ddd}
                            </IonLabel>
                        </IonItem>
                    </IonList>
                )}
            </IonContent>
        </IonPage>
    );
};

export default Home;
