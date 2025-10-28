'use client';

function EachMember() {

  return (
    <div className="md:max-w-[1150px] md:mt-12 mt-[-110px] mb-12 md:mb-24 ml-20 mr-12 md:mx-auto flex md:flex-row flex-col md:gap-24 gap-4" >
      <h3 className="md:w-2/3 w-full md:tracking-[0px] tracking-[-1px] text-palegray text-[27px] md:text-[71px] font-coulson leading-[30px] md:leading-[66px]">Each member of our team brings over a decade of specialized expertise in:</h3>
      <ul className="md:w-1/3 w-3/4 ml-auto md:ml-0 flex flex-col
      text-[13px] md:text-[16px] 
      gap-2 md:font-nunito md:font-normal font-bold font-thabit leading-[18px] md:leading-[26px] list-disc text-darkblue pt-4">
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
