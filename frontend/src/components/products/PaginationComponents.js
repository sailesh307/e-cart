import React, { useState } from 'react';
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const PaginationComponent = ({ pageCount = 1, handler = () => { } }) => {
    const [active, setActive] = useState(1);
    const getItemProps = (index) => ({
        variant: active === index ? "filled" : "text",
        color: "gray",
        onClick: () => {
            handler(index)
            setActive(index)
        },
    });

    const next = () => {
        if (active === pageCount) return;
        handler(active + 1);
        setActive(active + 1);
    };

    const prev = () => {
        if (active === 1) return;
        handler(active - 1)
        setActive(active - 1);
    };

    const renderPageButtons = () => {
        const maxButtonCount = 5;
        const buttons = [];
        const start = Math.max(1, active - Math.floor(maxButtonCount / 2));
        const end = Math.min(pageCount, start + maxButtonCount - 1);
        for (let i = start; i <= end; i++) {
            buttons.push(
                <IconButton clas key={i} {...getItemProps(i)}>
                    {i}
                </IconButton>
            );
        }
        return buttons;
    };

    return (
        <div className="flex items-center gap-1 md:gap-4">
            <Button
                variant="text"
                className="flex items-center gap-1"
                onClick={prev}
                disabled={active === 1}
            >
                <ArrowBackIos/>
                <span className='hidden md:block'>Prev</span>
            </Button>
            <div className="flex items-center gap-1">
                {renderPageButtons()}
            </div>
            <Button
                variant="text"
                className="flex items-center gap-1"
                onClick={next}
                disabled={active === pageCount}
            >
                <span className='hidden md:block'>Next</span>
                <ArrowForwardIos />
            </Button>
        </div>
    );
}

export default PaginationComponent;
