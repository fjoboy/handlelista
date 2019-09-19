import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Item } from '../item';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  private items;

  constructor(
    private itemService: ItemService
  ) { }

  ngOnInit() {
    this.getItems();
  }

  getItems(): void{
    this.itemService.getItems().subscribe((data) => this.items = data);
  }

}
