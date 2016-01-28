[
  { title: 'Seven Mobile Apps in Seven Weeks', cover: 'https://imagery.pragprog.com/products/445/7apps_xlargebeta.jpg?1453859078' },
  { title: 'Serverless Single Page Apps', cover: 'https://imagery.pragprog.com/products/453/brapps_xlargebeta.jpg?1446566716' },
  { title: 'Programming Elixir 1.2', cover: 'https://imagery.pragprog.com/products/491/elixir12_xlargebeta.jpg?1451929828' },
  { title: 'Developing for Apple Watch, Second Edition', cover: 'https://imagery.pragprog.com/products/465/jkwatch2_xlargebeta.jpg?1449158389' },
  { title: 'Rails, Angular, Postgres, and Bootstrap', cover: 'https://imagery.pragprog.com/products/448/dcbang_xlargecover.jpg?1437680108' },
  { title: 'Secure Your Node.js Web Application', cover: 'https://imagery.pragprog.com/products/443/kdnodesec_xlargecover.jpg?1433877235' },
  { title: 'Programming Phoenix', cover: 'https://imagery.pragprog.com/products/452/phoenix_xlargebeta.jpg?1441916658' },
  { title: 'Reactive Programming with RxJS', cover: 'https://imagery.pragprog.com/products/423/smreactjs_xlargecover.jpg?1438799363' },
  { title: 'Ruby Performance Optimization', cover: 'https://imagery.pragprog.com/products/425/adrpo_xlargecover.jpg?1427141274' },
  { title: 'Creating Great Teams', cover: 'https://imagery.pragprog.com/products/463/mmteams_xlargecover.jpg?1438711295' },
  { title: 'Practical Vim, Second Edition', cover: 'https://imagery.pragprog.com/products/462/dnvim2_xlargecover.jpg?1440682071' },
  { title: 'Modern Perl, Fourth Edition', cover: 'https://imagery.pragprog.com/products/458/swperl_xlargecover.jpg?1434051662' },
  { title: 'Deliver Audacious Web Apps with Ember 2', cover: 'https://imagery.pragprog.com/products/427/mwjsember_xlargecover.jpg?1433347051' },
  { title: 'Text Processing with Ruby', cover: 'https://imagery.pragprog.com/products/437/rmtpruby_xlargecover.jpg?1426186414' },
  { title: 'Pragmatic Scala', cover: 'https://imagery.pragprog.com/products/399/vsscala2_xlargecover.jpg?1442946461' },
  { title: 'Learn Game Programming with Ruby', cover: 'https://imagery.pragprog.com/products/419/msgpkids_xlargecover.jpg?1440431060' },
  { title: 'Exercises for Programmers', cover: 'https://imagery.pragprog.com/products/461/bhwb_xlargecover.jpg?1436545859' },
  { title: 'Customer Requirements', cover: 'https://imagery.pragprog.com/products/470/d-mbcreq_xlargecover.jpg?1445450768' }
].each do |book_data|
  book = Book.new({ title: book_data[:title], cover: URI.parse(book_data[:cover]) })
  book.save
end
