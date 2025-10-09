'use client';

import { useAdvancedParallax } from "../../../hooks/useParallax";

function EachMember() {

  return (
    <div className="max-w-[1150px] mt-12 mb-24 mx-auto flex gap-24" >
      <p className="w-2/3 text-palegray text-[71px] font-coulson" style={{ lineHeight: '66px' }}>Each member of our team brings over a decade of specialized expertise in:</p>
      <ul className="w-1/3 flex flex-col justify-between font-nunito list-disc text-darkblue pt-4">
        <li>UAS and Robotics Engineering</li>
        <li>Autonomous Flight Systems</li>
        <li>ISR and Electronic Warfare</li>
        <li>AI, Machine Learning & Computer Vision</li>
        <li>Advanced Carbon Fiber and Additive Manufacturing</li>
        <li>Defense Procurement and National Security Policy</li>
        <li>Venture Capital and Strategic M&A</li>
      </ul>
    </div>
  )
}

export default EachMember;
