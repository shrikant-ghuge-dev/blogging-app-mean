import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  @Input() post: any;

  constructor(private router: Router) { }


  ngOnInit(): void {
    console.log(this.post)
  }

  deleteHandler(p: any) { }

  onReadMore(id: any) {
    this.router.navigate(['/blog', id])
  }

}
