import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-marcas-slider',
  templateUrl: './marcas-slider.component.html',
  styleUrls: ['./marcas-slider.component.scss']
})
export class MarcasSliderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  slides = [
    {img: "assets/images/home/promperu.png"},
    {img: "assets/images/home/fpf.png"},
    {img: "assets/images/home/adex.png"},
    {img: "assets/images/home/gloria.png"},
    {img: "assets/images/home/fpf.png"},
  ];
  slideConfig = {
    slidesToShow: 4, 
    slidesToScroll: 1,
    infinite: true,
    arrows: true,
    autoplay: true,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };
}
