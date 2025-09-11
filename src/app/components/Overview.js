"use client";

import { getImageUrl } from "../../lib/utils";

function Overview() {   
    return (
        <div className="w-full bg-background transition-opacity duration-1000 ease-in-out">
            <div className="w-full max-w-[1200px] mx-auto mt-20 mb-4">
                <img src={getImageUrl("/overview-logo.png")} alt="Unmanned United Overview" className="w-20 h-20 mx-auto mb-6" />
                <h1 className="text-xl text-blue font-bold" style={{ fontFamily: 'var(--font-nunito-sans)' }}>Company OVERVIEW</h1>
            </div>
            <div className="w-full max-w-[1200px] mx-auto flex gap-12 mb-36">
            
            <div className="flex-1">
                <p className="text-xl font-light text-foreground" style={{ fontFamily: 'var(--font-nunito-sans)', lineHeight: '26px' }}>
                Unmanned United Inc. is a U.S.-based defense robotics firm focused on rapidly developing and deploying advanced uncrewed systems for tactical and strategic applications. With U.S. manufacturing, deep ISR expertise, and combat-informed innovation, we specialize in practical autonomous solutions that reduce cost, increase adaptability, and fill urgent capability gaps the U.S. Department of Defense faces in multi-domain operations.
                </p>
            </div>
            <div className="flex-1">
                <p className="text-xl font-light text-foreground" style={{ fontFamily: 'var(--font-nunito-sans)', lineHeight: '26px' }}>
                Our team includes veterans and U.S. military leadership, including former senior executives from Apple and ICE/CBP bringing decades of defense innovation, command insight, and real-world operational relevance.    </p>
            </div>


            </div>
        </div>
    )
}

export default Overview;