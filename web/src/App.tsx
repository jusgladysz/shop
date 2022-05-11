import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Navigation, Spinner } from './components';
import LoginPage from './components/pages/loginPage/LoginPage';
import { CartProvider, NotificationContext, PageResourceContext } from './contexts';
import { useFetch } from './hooks';
import useToken from './hooks/useToken';
import { NotificationMode, PageResource } from './models';
import * as PageResourceService from './services/pageResource.service';
import Views from './Views';

function App() {
    const { isLoading, data, error } = useFetch<PageResource>({ url: 'pageResource' });

    const { addPageResource } = useContext(PageResourceContext);
    const { addNotification } = useContext(NotificationContext);

    function getData() {
        if (error) {
            return addNotification({
                mode: NotificationMode.DANGER,
                title: 'Products',
                message: error,
            });
        }
        if (data) {
            const pageResource = PageResourceService.getEnabledPageResource(data);
            return addPageResource({ ...pageResource });
        }
    }

    useEffect(() => {
        getData();
    }, [data, error]);

    return (
        <>
            <CartProvider>
                <BrowserRouter>
                    <Navigation />
                    {isLoading ? <Spinner /> : <Views />}
                </BrowserRouter>
            </CartProvider>
        </>
    );
}

export default App;
