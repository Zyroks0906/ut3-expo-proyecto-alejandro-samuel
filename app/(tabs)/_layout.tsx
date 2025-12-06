// app/(tabs)/_layout.tsx
// Layout de las pestañas

import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { useSettingsStore } from '../../stores/useSettingsStore';
import { THEMES } from '../../constants/themes';

export default function TabsLayout() {
    const { settings } = useSettingsStore();
    const theme = THEMES[settings.theme];

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: theme.colors.accent,
                tabBarInactiveTintColor: theme.colors.textSecondary,
                tabBarStyle: {
                    backgroundColor: theme.colors.card,
                    borderTopColor: theme.colors.cardBorder,
                    borderTopWidth: 2,
                },
                headerStyle: {
                    backgroundColor: theme.colors.card,
                },
                headerTintColor: theme.colors.text,
                headerTitleStyle: {
                    fontWeight: '700',
                },
            }}
        >
            <Tabs.Screen
                name="dragones"
                options={{
                    title: 'Dragones',
                    tabBarIcon: ({ color }) => <TabIcon icon="🐉" color={color} />,
                }}
            />
            <Tabs.Screen
                name="hibridos"
                options={{
                    title: 'Híbridos',
                    tabBarIcon: ({ color }) => <TabIcon icon="🧬" color={color} />,
                }}
            />
            <Tabs.Screen
                name="criaturas"
                options={{
                    title: 'Criaturas',
                    tabBarIcon: ({ color }) => <TabIcon icon="🦅" color={color} />,
                }}
            />
            <Tabs.Screen
                name="scriptorium"
                options={{
                    title: 'Scriptorium',
                    tabBarIcon: ({ color }) => <TabIcon icon="⚙️" color={color} />,
                }}
            />
        </Tabs>
    );
}

function TabIcon({ icon, color }: { icon: string; color: string }) {
    return <Text style={{ fontSize: 24, color }}>{icon}</Text>;
}