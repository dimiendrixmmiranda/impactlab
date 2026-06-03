
import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { GiHamburgerMenu } from 'react-icons/gi';

export default function SidebarComponent() {
    const [visibleRight, setVisibleRight] = useState(false);

    return (
        <div className="card md:hidden">
            <div className="flex gap-2 justify-center items-center">
                <Button  onClick={() => setVisibleRight(true)}>
                    <GiHamburgerMenu  className='text-3xl'/>
                </Button>
            </div>

            <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
                <h2>Right Sidebar</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
            </Sidebar>
        </div>
    )
}
