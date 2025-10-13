import { getImageUrl } from "@/lib/utils";

const ProductDetail = () => {
  return (
    <div className="w-full bg-black border-black border-b relative" style={{ backgroundImage: `url(${getImageUrl("/product/product-bg.png")})`, backgroundSize: 'contain',  }}>
      <div className="absolute top-0 left-0 w-full h-[250px]" style={{ background: 'linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))' }}></div>
      <div className="absolute bottom-0 left-0 w-full h-[250px]" style={{ background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))' }}></div>

        <div className="w-full max-w-[1200px] mx-auto">

        <div className="w-full max-w-[700px] mx-auto pt-40 pb-40 relative" style={{ zIndex: 1000 }}>
            <p className="text-white text-lg font-nunito font-light">Overwatch is a Category II UAS that merges endurance, autonomy, payload flexibility, and battlefield survivability in a way that simply doesn’t exist anywhere else in the current market.</p>
            
        </div>

        <div className="pb-56 relative flex flex-col gap-48">

            <FirstSection />

            <SecondSection />

        </div>


        </div>
    </div>
  )
}

const FirstSection = () => {
  return (
    <div className="w-full flex gap-16 relative">
        <div className="w-2/3">
            <img src={getImageUrl("/product/product-detail-title.png")} alt="Product Detail" 
                    className="w-full object-cover mb-16" />

            <img src={getImageUrl("/product/product-detail-camera.png")} alt="Product Detail" 
                className="mb-16" />

            <p className="text-white text-lg font-nunito font-light w-1/2">
                Unmanned United was founded with one unflinching goal: to restore American and allied dominance in autonomous robotics, advanced manufacturing, and rapid defense innovation. In a world where conventional weapon systems are quickly outpaced by AI-driven threats, Unmanned United delivers the future of defense today.
            </p>

        </div>
        <div className="w-1/3 flex flex-col gap-10">
            <div className="flex flex-col gap-2">
                <p className="text-darkblue text-md font-thabit font-bold w-full text-right pr-2">
                    4K VIDEO REC.
                </p>
                <img src={getImageUrl("/product/product-detail-1.png")} alt="Product Detail" 
                    className="w-full object-cover" />
            </div>

            <div className="flex flex-col gap-2">
                <p className="text-darkblue text-md font-thabit font-bold w-full text-right pr-2">
                    HEAT VISION
                </p>
                <img src={getImageUrl("/product/product-detail-2.png")} alt="Product Detail" 
                    className="w-full object-cover" />
            </div>

            <div className="flex flex-col gap-2">
                <p className="text-darkblue text-md font-thabit font-bold w-full text-right pr-2">
                    NIGHT VISION
                </p>
                <img src={getImageUrl("/product/product-detail-3.png")} alt="Product Detail" 
                    className="w-full object-cover" />
            </div>
        
        </div>
        <img src={getImageUrl("/product/product-detail-model.png")} alt="Product Detail" 
                className="absolute right-[10%] top-[0%] w-[80%]" />
    </div>
  )
}


const SecondSection = () => {
    return (
        <div>
            <div className="w-full flex gap-16 relative">
                <div className="w-2/3">
                    
                    <img src={getImageUrl("/product/product-detail-title2.png")} alt="Product Detail" 
                            className="w-full object-cover mb-16" />

                    <p className="text-white text-lg font-nunito font-light w-1/2">
                        Unmanned United was founded with one unflinching goal: to restore American and allied dominance in autonomous robotics, advanced manufacturing, and rapid defense innovation. In a world where conventional weapon systems are quickly outpaced by AI-driven threats, Unmanned United delivers the future of defense today.
                    </p>
        
                </div>
                <div className="w-1/3 flex flex-col gap-10">
                    <img src={getImageUrl("/home/hero-logo.png")} alt="Product Detail" 
                        className="w-2/3 mr-12 object-cover ml-auto" />
                
                </div>
                <img src={getImageUrl("/product/product-detail-model2.png")} alt="Product Detail" 
                        className="absolute left-[15%] top-[-7%] w-[80%]" />

            </div>
            <div className="w-full flex gap-24 relative mt-32">
                <div className="w-2/3">
                    <img src={getImageUrl("/product/product-detail-title3.png")} alt="Product Detail" 
                            className="w-full object-cover mb-16" />        
                </div>
                <div className="w-1/3 flex flex-col pt-28">

                    <p className="text-white text-lg font-nunito font-light">
                    Unmanned United was founded with one unflinching goal: to restore American and allied dominance in autonomous robotics, advanced manufacturing, and rapid defense innovation. In a world where conventional weapon systems are quickly outpaced by AI-driven threats, Unmanned United delivers the future of defense today.
                    </p>                
                </div>
            </div>
        </div>
      
    )
  }

export default ProductDetail;