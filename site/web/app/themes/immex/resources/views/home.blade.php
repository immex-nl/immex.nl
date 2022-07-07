@extends('layouts.app')

@section('content')
  <div class="container">
    <div class="home__hero">
      <h1>Crypto starts <br/> with Immex</h1>
      <div class="home__hero--subtitle">Buy, sell and store over 175 digital assets at <br/> one of Europe’s leading exchanges.</div>
      <a href="#" class="button is-primary is-medium">
        <span>Start Trading</span>
        <span class="icon">
          @include('components.icons.arrow-right')
        </span>
      </a>
    </div>
  </div>
@endsection
