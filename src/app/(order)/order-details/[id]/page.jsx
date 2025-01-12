import React from 'react';

const Page = ({ params }) => {

    const { id } = params;

    return (
        <div>
            {id}
        </div>
    );
};

export default Page;