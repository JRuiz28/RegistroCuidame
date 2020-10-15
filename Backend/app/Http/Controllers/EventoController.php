<?php

namespace App\Http\Controllers;

use Validator, Hash, DB;
use App\Models\evento;
use App\Models\User;
use Illuminate\Http\Request;

class EventoController extends Controller{

    public function create(Request $request){

        $validator = Validator::make($request->all(),[
            'id_empresa'=>'required',
            'id_persona'=>'required',
            'temp'=>'required',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $evento = evento::create([
            'id_empresa' => $request->get('id_empresa'),
            'id_persona' => $request->get('id_persona'),
            'temp' => $request->get('temp'),
        ]);
        return response()->json(['status'=>'200','Message'=>'Dato registrado correctamente']);
    }

    public function list(){
        $evento = evento::all();
        return $evento;
    }

    public function count(){
        $res = DB::select(DB::raw( "SELECT count(*) as Num FROM evento UNION ALL SELECT count(*) as Num FROM users as e WHERE e.id_rol = 2 UNION ALL SELECT count(*) as Num FROM users as p WHERE p.id_rol = 3"));
        
        return $res;
    }

    public function user(Request $request){
        $user = DB::select(DB::raw(
            "SELECT u.id, u.id_rol, u.name, u.email FROM users AS u where u.email = '$request->email'"));
        return $user;
    }

    public function checkUser(Request $request){
        $user = DB::select(DB::raw(
            "SELECT u.id AS numero FROM users AS u where u.numero_documento = '$request->numero_documento'"));

        return $user;
    }

    public function list_persona($id_persona){
        $lista_persona = DB::select(DB::raw("SELECT persona.name AS nombre_persona, empresa.name AS nombre_empresa, empresa.direccion, evento.temp, evento.created_at FROM users AS persona, users AS empresa, evento WHERE evento.id_persona='$id_persona' AND persona.id =evento.id_persona AND empresa.id= evento.id_empresa"));
        return $lista_persona;
    }

    
    public function list_all(){
        $lista_persona = DB::select(DB::raw("SELECT persona.name AS nombre_persona, empresa.name AS nombre_empresa, empresa.direccion, evento.temp, evento.created_at FROM users AS persona, users AS empresa, evento WHERE persona.id =evento.id_persona AND empresa.id= evento.id_empresa"));
        return $lista_persona;
    }

    public function list_persona_doc($doc_persona){
        $exit = User::where('numero_documento', $doc_persona)->count();

        if($exit != 0){
            $lista_persona = DB::select(DB::raw("SELECT persona.name AS nombre_persona, empresa.name AS nombre_empresa, empresa.direccion, evento.temp, evento.created_at FROM users AS persona, users AS empresa, evento WHERE persona.numero_documento='$doc_persona' AND persona.id = evento.id_persona AND empresa.id = evento.id_empresa"));

            return $lista_persona;
        }else{
            return false;
        }
    }
    public function list_empresa($id_empresa){
        $lista_empresa = DB::select(DB::raw("SELECT persona.name AS nombre_persona, empresa.name AS nombre_empresa, empresa.direccion, evento.temp, evento.created_at FROM users AS persona, users AS empresa, evento WHERE evento.id_empresa='$id_empresa' AND persona.id =evento.id_persona AND empresa.id= evento.id_empresa"));
        return $lista_empresa;
    }
    


}

