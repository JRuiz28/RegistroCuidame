import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { ListEventComponent  } from './components/list-event/list-event.component';

const routes: Routes = [
  {
    path:'', 
    component:NavComponent, 
    children: [
      { path:'', component: HomeComponent },
      { path:'event', component: ListEventComponent },
  ]
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
