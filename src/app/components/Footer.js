export default function Footer() {
  return (
    <footer className="w-full bg-background relative z-20 transition-opacity duration-1000 ease-in-out">
      <div className="w-full h-full bg-darkblue border-t border-dashed border-white">
        <div className="w-[1200px] mx-auto mt-12 pb-20">
          <div className="space-y-4 flex justify-between gap-4">
            <p className="flex-1 text-lg font-light text-white" style={{ fontFamily: 'var(--font-nunito-sans)' }}>
              © 2025 Unmanned United Inc. All rights reserved.
            </p>
            <div className="flex-1 mt-0" style={{ marginTop: '0px' }}>
              <div className="flex gap-4">
                <div>
                  <p className="text-lg text-white" style={{ fontFamily: 'var(--font-nunito-sans)' }}>
                    <span className="font-semibold">Contact:</span>
                  </p>
                </div>
                <div>
                  <p className="text-lg font-light text-white" style={{ fontFamily: 'var(--font-nunito-sans)' }}>
                    info@unmannedunited.com
                  </p>
                  {/* <p className="text-lg font-light text-white" style={{ fontFamily: 'var(--font-nunito-sans)' }}>
                    +1-321-389-1600
                  </p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
