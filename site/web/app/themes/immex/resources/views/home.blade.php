@extends('layouts.app')

@section('content')
  <div class="container">
    <section class="home__hero">
      <div class="columns">
        <div class="column is-7">
          <h1>Crypto starts <br/> with Immex</h1>
          <div class="home__hero--subtitle">Buy, sell and store over 175 digital assets at <br/> one of Europe’s leading exchanges.</div>
          <a href="#" class="button is-primary is-medium">
            <span>Start Trading</span>
            <span class="icon">
              @include('components.icons.arrow-right')
            </span>
          </a>
        </div>
        <div class="column is-5 has-text-align-center">
          <img src="@asset('hero.svg')" alt="" class="home__hero--img">
        </div>
      </div>
    </section>
    <section class="home__markets">
      <h2>Markets</h2>
      <div class="home__table">
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>Asset</th>
              <th>Price</th>
              <th>Volume</th>
              <th>Change <span>(24h)</span></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            @foreach( ["BTC", "ETH", "GT", "SOL", "XRP", "DOGE", "NEAR", "XMR"] as $item )
              <tr class="{{ $item }}">
                <td>
                  <img src="https://www.gate.io/images/coin_icon/64/{{ strtolower($item) }}.png" alt=""/>
                  <span>{!! $item !!} <strong>/USDT</strong></span>
                </td>
                <td class="td__price">
                  <strong class="has-text-success">$0</strong>
                </td>
                <td class="td__volume">0</td>
                <td class="td__change">
                  <strong>0</strong>
                </td>
                <td>
                  <button class="button is-small is-light" style="float: right;">
                    <strong>Trade</strong>
                  </button>
                </td>
              </tr>
            @endforeach
          </tbody>
        </table>
      </div>
    </section>
  </div>
@endsection
