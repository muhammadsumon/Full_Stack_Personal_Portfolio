import roundAccountBox from '@iconify/icons-ic/round-account-box';
import { Icon } from '@iconify/react';
import { capitalCase } from 'change-case';
import { useEffect, useState } from 'react';
// material
import { Box, Container, Stack, Tab, Tabs } from '@mui/material';
// redux
import { useDispatch } from '../../../redux/store';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import Page from '../../../components/Page';
import {
    AccountGeneral
} from '../../../components/_dashboard/user/account';

// ----------------------------------------------------------------------

export default function UserAccount() {
    const { themeStretch } = useSettings();
    const [currentTab, setCurrentTab] = useState('general');
    const dispatch = useDispatch();

    useEffect(() => {

    }, [dispatch]);

    const ACCOUNT_TABS = [
        {
            value: 'general',
            icon: <Icon icon={roundAccountBox} width={20} height={20} />,
            component: <AccountGeneral />
        }
    ];

    const handleChangeTab = (event, newValue) => {
        setCurrentTab(newValue);
    };

    return (
        <Page title="User: Account Settings | Ms Portfolio">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Account"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'User', href: PATH_DASHBOARD.user.root },
                        { name: 'Account Settings' }
                    ]}
                />

                <Stack spacing={5}>
                    <Tabs
                        value={currentTab}
                        scrollButtons="auto"
                        variant="scrollable"
                        allowScrollButtonsMobile
                        onChange={handleChangeTab}
                    >
                        {ACCOUNT_TABS.map((tab) => (
                            <Tab disableRipple key={tab.value} label={capitalCase(tab.value)} icon={tab.icon} value={tab.value} />
                        ))}
                    </Tabs>

                    {ACCOUNT_TABS.map((tab) => {
                        const isMatched = tab.value === currentTab;
                        return isMatched && <Box key={tab.value}>{tab.component}</Box>;
                    })}
                </Stack>
            </Container>
        </Page>
    );
}
