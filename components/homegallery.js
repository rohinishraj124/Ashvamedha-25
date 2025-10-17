import React from 'react';
import Image from 'next/image';

// Storing image URLs in an array makes the code cleaner and easier to manage.
// Each inner array represents a column in the gallery.
const galleryColumns = [
  // Column 1
  [
    { src: "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1728626960/ashvamedha/ashvamedha2023/rvuyd0jdnuyi8p9ybsj3.jpg", width: 800, height: 1200 },
    { src: "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1728626960/ashvamedha/ashvamedha2023/qxgodwopz0prrfgkbovi.jpg", width: 800, height: 533 },
    { src: "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1728626960/ashvamedha/ashvamedha2023/v2ghczhivwgsxts0inzg.jpg", width: 800, height: 533 },
    { src: "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1728626966/ashvamedha/ashvamedha2023/izmdegn1bsnlfjdjnifg.jpg", width: 800, height: 533 },
    { src: "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1728626959/ashvamedha/ashvamedha2023/u6sttvzlg2vf9lml0iuk.jpg", width: 800, height: 1200 },
    { src: "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1728626960/ashvamedha/ashvamedha2023/hhihksuvm3u7l2q06vxn.jpg", width: 800, height: 533 },
  ],
  // Column 2
  [
    { src: "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1728626960/ashvamedha/ashvamedha2023/isasc0jcybb01tbf8bya.jpg", width: 800, height: 533 },
    { src: "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1728627693/ashvamedha/ashvamedha2023/v7b1r4sgp4qbyyh7hvxk.jpg", width: 800, height: 533 },
    { src: "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1728626958/ashvamedha/ashvamedha2023/cg6zbltjoanvntv07h9w.jpg", width: 800, height: 533 },
    { src: "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1728626958/ashvamedha/ashvamedha2023/hd0kbg4gt5gr7bssebqg.jpg", width: 800, height: 1200 },
    { src: "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1728629921/ashvamedha/ashvamedha2023/bvhyx0cakqhzx9jflwwb.jpg", width: 800, height: 533 },
  ],
  // Column 3
  [
    { src: "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1728626959/ashvamedha/ashvamedha2023/e14cba6woh7gbxi9ssho.jpg", width: 800, height: 533 },
    { src: "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1728626961/ashvamedha/ashvamedha2023/xmpndasxnoiyo1ethn09.jpg", width: 800, height: 1200 },
    { src: "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1728626958/ashvamedha/ashvamedha2023/arhy2bwl1t47zejc0rz6.jpg", width: 800, height: 533 },
    { src: "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1728626961/ashvamedha/ashvamedha2023/wlezohimcshwzqzwfpfg.jpg", width: 800, height: 533 },
    { src: "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1728626959/ashvamedha/ashvamedha2023/zitwgkjlpia8qxv6ak1v.jpg", width: 800, height: 533 },
    { src: "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1728626958/ashvamedha/ashvamedha2023/g40ysmbcfqqeynamyusp.jpg", width: 800, height: 1200 },
  ],
];

function HomeGallery() {
  return (
    <div className='py-12 bg-[#151515]'>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold md:text-6xl">
          <span className="text-warm">GLIMP</span>
          <span className="text-white">SES</span>
        </h1>
      </div>

      <div className="flex w-11/12 md:w-4/5 mx-auto">
        {galleryColumns.map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col w-1/3 px-1">
            {column.map((image, imgIndex) => (
              <div key={imgIndex} className="mb-2">
                <Image
                  src={image.src}
                  alt={`Gallery image ${colIndex}-${imgIndex}`}
                  width={image.width}
                  height={image.height}
                  layout="responsive"
                  className="rounded-lg"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeGallery;