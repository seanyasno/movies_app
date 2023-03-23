import React from 'react';

import { Appbar } from 'react-native-paper';

type Props = {
    title: string;
};

export const CustomAppbar: React.FC<Props> = (props) => {
    const { title } = props;
    return (
        <Appbar.Header>
            <Appbar.Content title={title} />
        </Appbar.Header>
    );
};
