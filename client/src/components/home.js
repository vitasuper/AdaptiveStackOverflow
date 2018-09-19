import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Home extends Component {
  constructor(props) {
    super(props);

    console.log("client/src/components/home.js - this.props: ")
    console.log(props)

    this.state = {
      username: props.getUsername(),
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.handleSelectedText = this.handleSelectedText.bind(this);
    this.handleBookmark = this.handleBookmark.bind(this);
    this.handleTitleClick = this.handleTitleClick.bind(this);
  }

  handleClick() {
    console.log("current user: " + this.state.username);
    console.log("The link is clicked");
    axios
        .get('/userevent/' + this.state.username + '/types')
        .then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log('save error');
        });
  }

  handleSelectedText() {
    let txt = '';
    if (window.getSelection) {
      txt = window.getSelection();
    } else if (document.getSelection) {
      txt = document.getSelection();
    } else if (document.selection) {
      txt = document.selection.createRange().text;
    }

    if (txt != '') {
      console.log(`Selected text is ${txt} and user is ${this.state.username}`);
      axios
        .post('/userevent/' + this.state.username + '/types/userSelectTextEvent', { extraInfo: txt.toString() })  // NOTE: toString is a must!
        .then((response) => {
            console.log("============Post select word event!=========");
            console.log(response.data);
        }).catch((error) => {
            console.log('save error');
        });
        
    }
  }

  handleBookmark(e) {
    e.preventDefault();

    alert('Bookmark successfully!');

    axios
      .post('/userevent/' + this.state.username + '/types/userBookmarkEvent', { extraInfo: e.target.value.toString() })  // NOTE: toString is a must!
      .then((response) => {
          console.log(response.data);
      }).catch((error) => {
          console.log('save error');
      });
  }

  handleTitleClick() {
    console.log('===title clicked===');

    axios
      .post('/userevent/' + this.state.username + '/types/userClickTitleEvent', { extraInfo: '' })
      .then((response) => {
          console.log(response.data);
      }).catch((error) => {
          console.log('save error');
      });
  }

  render() {
    const imageStyle = {
      width: 400,
    };

    return (
      <div className="stackoverflow-content">
        <div>
          <p onClick={this.handleClick}>It's <b>good</b> to be home</p>
          <img style={imageStyle} src="https://i.ytimg.com/vi/N1icEHtgb3g/maxresdefault.jpg" />
        </div>

        <div className="question-summary columns" id="question-summary-2770321">
            <div className="statscontainer col-2">
              <div className="stats">
                  <div className="vote">
                    <div className="votes">
                        <span className="vote-count-post "><strong>529</strong></span>
                        <div className="viewcount">votes</div>
                    </div>
                  </div>
                  <div className="status answered">
                    <strong>14</strong>
                    answers
                  </div>
              </div>
              <div className="views supernova" title="172,855 views">
                  173k views
              </div>
            </div>
            <div className="summary col-10">
              <h3><a  className="question-hyperlink text-dark" onClick={this.handleTitleClick} >What is a raw type and why shouldn't we use it?</a></h3>
              <button className="btn btn-sm" value="What is a raw type and why shouldn't we use it?" onClick={this.handleBookmark}>Click to bookmark this question</button>
              <div className="excerpt" onMouseUp={this.handleSelectedText}>
                {`
                  Questions:
                  What are raw types in Java, and why do I often hear that they shouldn't be used in new code?
                  What is the alternative if we can't use raw types, and how is it better?`}
              </div>
              <div className="tags t-java t-generics t-raw-types">
                  <a  className="post-tag label label-warning" title="show questions tagged 'java'" rel="tag">java</a> <a  className="post-tag label label-warning" title="show questions tagged 'generics'" rel="tag">generics</a> <a  className="post-tag label label-warning" title="show questions tagged 'raw-types'" rel="tag">raw-types</a> 
              </div>
              <div className="started fr">
                  <div className="user-info user-hover">
                    <div className="user-action-time">
                        asked <span title="2010-05-05 02:48:53Z" className="relativetime">May 5 '10 at 2:48</span>
                    </div>
                    <div className="user-gravatar32">
                        <a >
                          <div className="gravatar-wrapper-32"><img src="https://www.gravatar.com/avatar/30fe97e726af0ea4ff8b756fbf2e6d15?s=32&amp;d=identicon&amp;r=PG" alt="" width="32" height="32" /></div>
                        </a>
                    </div>
                    <div className="user-details">
                        <a >polygenelubricants</a>
                        <div className="-flair">
                          <span className="reputation-score" title="reputation score 272,751" dir="ltr">273k</span><span title="98 gold badges"><span className="badge1"></span><span className="badgecount">98</span></span><span title="500 silver badges"><span className="badge2"></span><span className="badgecount">500</span></span><span title="587 bronze badges"><span className="badge3"></span><span className="badgecount">587</span></span>
                        </div>
                    </div>
                  </div>
              </div>
            </div>
        </div>

        <div class="question-summary columns" id="question-summary-513832">
            <div class="statscontainer col-2">
              <div class="stats">
                  <div class="vote">
                    <div class="votes">
                        <span class="vote-count-post "><strong>727</strong></span>
                        <div class="viewcount">votes</div>
                    </div>
                  </div>
                  <div class="status answered-accepted">
                    <strong>23</strong>answers
                  </div>
              </div>
              <div class="views supernova" title="3,250,735 views">
                  3.3m views
              </div>
            </div>
            <div class="summary col-10">
              <h3><a  class="question-hyperlink text-dark" onClick={this.handleTitleClick} >How do I compare strings in Java?</a></h3>
              <button className="btn btn-sm" value="How do I compare strings in Java?" onClick={this.handleBookmark}>Click to bookmark this question</button>
              <div className="excerpt" onMouseUp={this.handleSelectedText}>
                  {`I've been using the == operator in my program to compare all my strings so far.
                  However, I ran into a bug, changed one of them into .equals() instead, and it fixed the bug.
                  Is == bad? When should it ...`}
              </div>
              <div class="tags t-java t-string t-equality">
                  <a  class="post-tag label label-warning" title="" rel="tag">java</a> <a  class="post-tag label label-warning" title="show questions tagged 'string'" rel="tag">string</a> <a  class="post-tag label label-warning" title="show questions tagged 'equality'" rel="tag">equality</a> 
              </div>
              <div class="started fr">
                  <div class="user-info">
                    <div class="user-details">
                        <span class="community-wiki" title="This post is community owned as of Dec 17 '13 at 11:46. Votes do not generate reputation, and it can be edited by users with 100 rep">
                        community wiki
                        </span>
                    </div>
                    <br />
                    <div class="user-details">
                        <a id="history-513832"  title="show revision history for this post">
                        Nathan H
                        </a>
                    </div>
                  </div>
              </div>
            </div>
        </div>
        <div class="question-summary columns" id="question-summary-40480">
            <div class="statscontainer col-2">
              <div class="stats">
                  <div class="vote">
                    <div class="votes">
                        <span class="vote-count-post high-scored-post"><strong>5557</strong></span>
                        <div class="viewcount">votes</div>
                    </div>
                  </div>
                  <div class="status answered">
                    <strong>77</strong>answers
                  </div>
              </div>
              <div class="views supernova" title="1,635,712 views">
                  1.6m views
              </div>
            </div>
            <div class="summary col-10">
              <h3><a  class="question-hyperlink text-dark" onClick={this.handleTitleClick} >Is Java “pass-by-reference” or “pass-by-value”?</a></h3>
              <button className="btn btn-sm" value="Is Java “pass-by-reference” or “pass-by-value”?" onClick={this.handleBookmark}>Click to bookmark this question</button>
              <div className="excerpt" onMouseUp={this.handleSelectedText}>
                  {`I always thought Java was pass-by-reference.
                  However, I've seen a couple of blog posts (for example, this blog) that claim that it isn't.
                  I don't think I understand the distinction they're making. 
                  ...`}
              </div>
              <div class="tags t-java t-methods t-parameter-passing t-pass-by-reference t-pass-by-value">
                  <a  class="post-tag label label-warning" title="show questions tagged 'java'" rel="tag">java</a> <a  class="post-tag label label-warning" title="show questions tagged 'methods'" rel="tag">methods</a> <a  class="post-tag label label-warning" title="show questions tagged 'parameter-passing'" rel="tag">parameter-passing</a> <a  class="post-tag label label-warning" title="show questions tagged 'pass-by-reference'" rel="tag">pass-by-reference</a> <a  class="post-tag label label-warning" title="show questions tagged 'pass-by-value'" rel="tag">pass-by-value</a> 
              </div>
              <div class="started fr">
                  <div class="user-info">
                    <div class="user-details">
                        <span class="community-wiki" title="This post is community owned as of Sep 14 '12 at 18:22. Votes do not generate reputation, and it can be edited by users with 100 rep">
                        community wiki
                        </span>
                    </div>
                    <br />
                    <div class="user-details">
                        <a id="history-40480"  title="show revision history for this post">
                        21 revs, 17 users 15%<br /></a><a >user4315</a>
                    </div>
                  </div>
              </div>
            </div>
        </div>
        <div class="question-summary columns" id="question-summary-6343166">
            <div class="statscontainer col-2">
              <div class="stats">
                  <div class="vote">
                    <div class="votes">
                        <span class="vote-count-post high-scored-post"><strong>2017</strong></span>
                        <div class="viewcount">votes</div>
                    </div>
                  </div>
                  <div class="status answered-accepted">
                    <strong>49</strong>answers
                  </div>
              </div>
              <div class="views supernova" title="1,007,239 views">
                  1.0m views
              </div>
            </div>
            <div class="summary col-10">
              <h3><a  class="question-hyperlink text-dark" onClick={this.handleTitleClick} >How do I fix android.os.NetworkOnMainThreadException?</a></h3>
              <button className="btn btn-sm" value="How do I fix android.os.NetworkOnMainThreadException?" onClick={this.handleBookmark}>Click to bookmark this question</button>
              <div className="excerpt" onMouseUp={this.handleSelectedText}>
                  {`I got an error while running my Android project for RssReader. 
                  Code:
                  URL url = new URL(urlToRssFeed);
                  SAXParserFactory factory = SAXParserFactory.newInstance();
                  SAXParser parser = factory....`}
              </div>
              <div class="tags t-java t-android t-networkonmainthread t-thread-exceptions">
                  <a  class="post-tag label label-warning" title="show questions tagged 'java'" rel="tag">java</a> <a  class="post-tag label label-warning" title="show questions tagged 'android'" rel="tag"><img src="//i.stack.imgur.com/tKsDb.png" height="16" width="18" alt="" class="sponsor-tag-img" />android</a> <a  class="post-tag label label-warning" title="show questions tagged 'networkonmainthread'" rel="tag">networkonmainthread</a> <a  class="post-tag label label-warning" title="show questions tagged 'thread-exceptions'" rel="tag">thread-exceptions</a> 
              </div>
              <div class="started fr">
                  <div class="user-info ">
                    <div class="user-action-time">
                        asked <span title="2011-06-14 12:02:00Z" class="relativetime">Jun 14 '11 at 12:02</span>
                    </div>
                    <div class="user-gravatar32">
                        <a >
                          <div class="gravatar-wrapper-32"><img src="https://www.gravatar.com/avatar/ed2f53c878a1477e24121d5d87d048c8?s=32&amp;d=identicon&amp;r=PG" alt="" width="32" height="32" /></div>
                        </a>
                    </div>
                    <div class="user-details">
                        <a >bejoy george</a>
                        <div class="-flair">
                          <span class="reputation-score" title="reputation score 10,631" dir="ltr">10.6k</span><span title="4 gold badges"><span class="badge1"></span><span class="badgecount">4</span></span><span title="13 silver badges"><span class="badge2"></span><span class="badgecount">13</span></span><span title="15 bronze badges"><span class="badge3"></span><span class="badgecount">15</span></span>
                        </div>
                    </div>
                  </div>
              </div>
            </div>
        </div>
        <div class="question-summary columns" id="question-summary-9554636">
            <div class="statscontainer col-2">
              <div class="stats">
                  <div class="vote">
                    <div class="votes">
                        <span class="vote-count-post "><strong>487</strong></span>
                        <div class="viewcount">votes</div>
                    </div>
                  </div>
                  <div class="status answered-accepted">
                    <strong>9</strong>answers
                  </div>
              </div>
              <div class="views supernova" title="102,922 views">
                  103k views
              </div>
            </div>
            <div class="summary col-10">
              <h3><a  class="question-hyperlink text-dark" onClick={this.handleTitleClick} >The Use of Multiple JFrames: Good or Bad Practice? [closed]</a></h3>
              <button className="btn btn-sm" value="The Use of Multiple JFrames: Good or Bad Practice? [closed]" onClick={this.handleBookmark}>Click to bookmark this question</button>
              <div className="excerpt" onMouseUp={this.handleSelectedText}>
                  {`I'm developing an application which displays images, and plays sounds from a database. I'm trying to decide whether or not to use a separate JFrame to add images to the database from the GUI. 
                  I'm ...`}
              </div>
              <div class="tags t-java t-swing t-user-interface t-jframe">
                  <a  class="post-tag label label-warning" title="show questions tagged 'java'" rel="tag">java</a> <a  class="post-tag label label-warning" title="show questions tagged 'swing'" rel="tag">swing</a> <a  class="post-tag label label-warning" title="show questions tagged 'user-interface'" rel="tag">user-interface</a> <a  class="post-tag label label-warning" title="show questions tagged 'jframe'" rel="tag">jframe</a> 
              </div>
              <div class="started fr">
                  <div class="user-info user-hover">
                    <div class="user-action-time">
                        asked <span title="2012-03-04 11:53:40Z" class="relativetime">Mar 4 '12 at 11:53</span>
                    </div>
                    <div class="user-gravatar32">
                        <a >
                          <div class="gravatar-wrapper-32"><img src="https://www.gravatar.com/avatar/020340a72dfea67df7c4ead460b56c9d?s=32&amp;d=identicon&amp;r=PG" alt="" width="32" height="32" /></div>
                        </a>
                    </div>
                    <div class="user-details">
                        <a >Peddler</a>
                        <div class="-flair">
                          <span class="reputation-score" title="reputation score " dir="ltr">2,700</span><span title="4 gold badges"><span class="badge1"></span><span class="badgecount">4</span></span><span title="12 silver badges"><span class="badge2"></span><span class="badgecount">12</span></span><span title="20 bronze badges"><span class="badge3"></span><span class="badgecount">20</span></span>
                        </div>
                    </div>
                  </div>
              </div>
            </div>
        </div>
        <div class="question-summary columns" id="question-summary-23353173">
            <div class="statscontainer col-2">
              <div class="stats">
                  <div class="vote">
                    <div class="votes">
                        <span class="vote-count-post "><strong>629</strong></span>
                        <div class="viewcount">votes</div>
                    </div>
                  </div>
                  <div class="status answered-accepted">
                    <strong>18</strong>answers
                  </div>
              </div>
              <div class="views supernova" title="323,889 views">
                  324k views
              </div>
            </div>
            <div class="summary col-10">
              <h3><a  class="question-hyperlink text-dark" onClick={this.handleTitleClick} >Unfortunately MyApp has stopped. How can I solve this?</a></h3>
              <button className="btn btn-sm" value="Unfortunately MyApp has stopped. How can I solve this?" onClick={this.handleBookmark}>Click to bookmark this question</button>
              <div className="excerpt" onMouseUp={this.handleSelectedText}>
                  {`I am developing an application, and everytime I run it, I get the message:
                  Unfortunately, MyApp has stopped.
                  What can I do to solve this?
                  About this question - obviously inspired by What is a ...`}
              </div>
              <div class="tags t-java t-android t-debugging t-kotlin t-crash">
                  <a  class="post-tag label label-warning" title="show questions tagged 'java'" rel="tag">java</a> <a  class="post-tag label label-warning" title="show questions tagged 'android'" rel="tag"><img src="//i.stack.imgur.com/tKsDb.png" height="16" width="18" alt="" class="sponsor-tag-img" />android</a> <a  class="post-tag label label-warning" title="show questions tagged 'debugging'" rel="tag">debugging</a> <a  class="post-tag label label-warning" title="show questions tagged 'kotlin'" rel="tag"><img src="//i.stack.imgur.com/NT6zO.png" height="16" width="18" alt="" class="sponsor-tag-img" />kotlin</a> <a  class="post-tag label label-warning" title="show questions tagged 'crash'" rel="tag">crash</a> 
              </div>
              <div class="started fr">
                  <div class="user-info ">
                    <div class="user-action-time">
                        asked <span title="2014-04-28 23:55:14Z" class="relativetime">Apr 28 '14 at 23:55</span>
                    </div>
                    <div class="user-gravatar32">
                        <a >
                          <div class="gravatar-wrapper-32"><img src="https://www.gravatar.com/avatar/6e7a971eb341ffeaa3efca407239bf3b?s=32&amp;d=identicon&amp;r=PG" alt="" width="32" height="32" /></div>
                        </a>
                    </div>
                    <div class="user-details">
                        <a >nhaarman</a>
                        <div class="-flair">
                          <span class="reputation-score" title="reputation score 56,930" dir="ltr">56.9k</span><span title="44 gold badges"><span class="badge1"></span><span class="badgecount">44</span></span><span title="193 silver badges"><span class="badge2"></span><span class="badgecount">193</span></span><span title="239 bronze badges"><span class="badge3"></span><span class="badgecount">239</span></span>
                        </div>
                    </div>
                  </div>
              </div>
            </div>
        </div>
        <div class="question-summary columns" id="question-summary-5554734">
            <div class="statscontainer col-2">
              <div class="stats">
                  <div class="vote">
                    <div class="votes">
                        <span class="vote-count-post "><strong>210</strong></span>
                        <div class="viewcount">votes</div>
                    </div>
                  </div>
                  <div class="status answered-accepted">
                    <strong>19</strong>answers
                  </div>
              </div>
              <div class="views supernova" title="467,793 views">
                  468k views
              </div>
            </div>
            <div class="summary col-10">
              <h3><a  class="question-hyperlink text-dark" onClick={this.handleTitleClick} >What causes a java.lang.ArrayIndexOutOfBoundsException and how do I prevent it?</a></h3>
              <button className="btn btn-sm" value="What causes a java.lang.ArrayIndexOutOfBoundsException and how do I prevent it?" onClick={this.handleBookmark}>Click to bookmark this question</button>
              <div className="excerpt" onMouseUp={this.handleSelectedText}>
                  {`What does ArrayIndexOutOfBoundsException mean and how do I get rid of it? 
                  Here is a code sample that triggers the exception:
                  String[] name = {"tom", "dick", "harry"};
                  for(int i = 0; i&lt;=name....`}
              </div>
              <div class="tags t-java t-arrays t-indexoutofboundsexception">
                  <a  class="post-tag label label-warning" title="show questions tagged 'java'" rel="tag">java</a> <a  class="post-tag label label-warning" title="show questions tagged 'arrays'" rel="tag">arrays</a> <a  class="post-tag label label-warning" title="show questions tagged 'indexoutofboundsexception'" rel="tag">indexoutofboundsexception</a> 
              </div>
              <div class="started fr">
                  <div class="user-info ">
                    <div class="user-action-time">
                        asked <span title="2011-04-05 15:54:03Z" class="relativetime">Apr 5 '11 at 15:54</span>
                    </div>
                    <div class="user-gravatar32">
                        <a >
                          <div class="gravatar-wrapper-32"><img src="https://www.gravatar.com/avatar/03e1aca9ba72d5c86caff04784c3a1dd?s=32&amp;d=identicon&amp;r=PG" alt="" width="32" height="32" /></div>
                        </a>
                    </div>
                    <div class="user-details">
                        <a >Aaron</a>
                        <div class="-flair">
                          <span class="reputation-score" title="reputation score " dir="ltr">3,726</span><span title="14 gold badges"><span class="badge1"></span><span class="badgecount">14</span></span><span title="47 silver badges"><span class="badge2"></span><span class="badgecount">47</span></span><span title="65 bronze badges"><span class="badge3"></span><span class="badgecount">65</span></span>
                        </div>
                    </div>
                  </div>
              </div>
            </div>
        </div>
        <div class="question-summary columns" id="question-summary-13102045">
            <div class="statscontainer col-2">
              <div class="stats">
                  <div class="vote">
                    <div class="votes">
                        <span class="vote-count-post "><strong>493</strong></span>
                        <div class="viewcount">votes</div>
                    </div>
                  </div>
                  <div class="status answered-accepted">
                    <strong>15</strong>answers
                  </div>
              </div>
              <div class="views supernova" title="328,656 views">
                  329k views
              </div>
            </div>
            <div class="summary col-10">
              <h3><a  class="question-hyperlink text-dark" onClick={this.handleTitleClick} >Scanner is skipping nextLine() after using next() or nextFoo()?</a></h3>
              <button className="btn btn-sm" value="Scanner is skipping nextLine() after using next() or nextFoo()?" onClick={this.handleBookmark}>Click to bookmark this question</button>
              <div className="excerpt" onMouseUp={this.handleSelectedText}>
                  {`I am using the Scanner methods nextInt() and nextLine() for reading input. 
                  It looks like this:
                  System.out.println("Enter numerical value");    
                  int option;
                  option = input.nextInt(); // Read ...`}
              </div>
              <div class="tags t-java t-io t-javaûutilûscanner">
                  <a  class="post-tag label label-warning" title="show questions tagged 'java'" rel="tag">java</a> <a  class="post-tag label label-warning" title="show questions tagged 'io'" rel="tag">io</a> <a href="/questions/tagged/java.util.scanner" class="post-tag label label-warning" title="show questions tagged 'java.util.scanner'" rel="tag">java.util.scanner</a> 
              </div>
              <div class="started fr">
                  <div class="user-info user-hover">
                    <div class="user-action-time">
                        asked <span title="2012-10-27 16:37:01Z" class="relativetime">Oct 27 '12 at 16:37</span>
                    </div>
                    <div class="user-gravatar32">
                        <a >
                          <div class="gravatar-wrapper-32"><img src="https://www.gravatar.com/avatar/6e08ef39da71060ac4a76e5313d4e9fe?s=32&amp;d=identicon&amp;r=PG" alt="" width="32" height="32" /></div>
                        </a>
                    </div>
                    <div class="user-details">
                        <a >blekione</a>
                        <div class="-flair">
                          <span class="reputation-score" title="reputation score " dir="ltr">2,781</span><span title="3 gold badges"><span class="badge1"></span><span class="badgecount">3</span></span><span title="9 silver badges"><span class="badge2"></span><span class="badgecount">9</span></span><span title="16 bronze badges"><span class="badge3"></span><span class="badgecount">16</span></span>
                        </div>
                    </div>
                  </div>
              </div>
            </div>
        </div>
        <div class="question-summary columns" id="question-summary-5621338">
            <div class="statscontainer col-2">
              <div class="stats">
                  <div class="vote">
                    <div class="votes">
                        <span class="vote-count-post "><strong>208</strong></span>
                        <div class="viewcount">votes</div>
                    </div>
                  </div>
                  <div class="status answered">
                    <strong>11</strong>answers
                  </div>
              </div>
              <div class="views hot" title="36,700 views">
                  37k views
              </div>
            </div>
            <div class="summary col-10">
              <h3><a  class="question-hyperlink text-dark" onClick={this.handleTitleClick} >How to add JTable in JPanel with null layout?</a></h3>
              <button className="btn btn-sm" value="How to add JTable in JPanel with null layout?" onClick={this.handleBookmark}>Click to bookmark this question</button>
              <div className="excerpt" onMouseUp={this.handleSelectedText}>
                  I want to add JTable into JPanel whose layout is null.  JPanel contains other components. I have to add JTable at proper position.
              </div>
              <div class="tags t-java t-swing t-layout t-layout-manager t-null-layout-manager">
                  <a  class="post-tag label label-warning" title="show questions tagged 'java'" rel="tag">java</a> <a  class="post-tag label label-warning" title="show questions tagged 'swing'" rel="tag">swing</a> <a  class="post-tag label label-warning" title="show questions tagged 'layout'" rel="tag">layout</a> <a  class="post-tag label label-warning" title="show questions tagged 'layout-manager'" rel="tag">layout-manager</a> <a  class="post-tag label label-warning" title="show questions tagged 'null-layout-manager'" rel="tag">null-layout-manager</a> 
              </div>
              <div class="started fr">
                  <div class="user-info ">
                    <div class="user-action-time">
                        asked <span title="2011-04-11 12:35:34Z" class="relativetime">Apr 11 '11 at 12:35</span>
                    </div>
                    <div class="user-gravatar32">
                        <a >
                          <div class="gravatar-wrapper-32"><img src="https://www.gravatar.com/avatar/9ea22dec1e301d5ffff51c1e3d4b99f7?s=32&amp;d=identicon&amp;r=PG" alt="" width="32" height="32" /></div>
                        </a>
                    </div>
                    <div class="user-details">
                        <a >Sagar</a>
                        <div class="-flair">
                          <span class="reputation-score" title="reputation score " dir="ltr">1,050</span><span title="2 gold badges"><span class="badge1"></span><span class="badgecount">2</span></span><span title="8 silver badges"><span class="badge2"></span><span class="badgecount">8</span></span><span title="3 bronze badges"><span class="badge3"></span><span class="badgecount">3</span></span>
                        </div>
                    </div>
                  </div>
              </div>
            </div>
        </div>
        <div class="question-summary columns" id="question-summary-3177733">
            <div class="statscontainer col-2">
              <div class="stats">
                  <div class="vote">
                    <div class="votes">
                        <span class="vote-count-post high-scored-post"><strong>1537</strong></span>
                        <div class="viewcount">votes</div>
                    </div>
                  </div>
                  <div class="status answered-accepted">
                    <strong>29</strong>answers
                  </div>
              </div>
              <div class="views supernova" title="252,006 views">
                  252k views
              </div>
            </div>
            <div class="summary col-10">
              <h3><a  class="question-hyperlink text-dark" onClick={this.handleTitleClick} >How to avoid Java code in JSP files?</a></h3>
              <button className="btn btn-sm" value="How to avoid Java code in JSP files?" onClick={this.handleBookmark}>Click to bookmark this question</button>
              <div className="excerpt" onMouseUp={this.handleSelectedText}>
                 {`I'm new to Java EE and I know that something like the following three lines
                  &lt;%= x+1 %&gt;
                  &lt;%= request.getParameter("name") %&gt;
                  &lt;%! counter++; %&gt;
                  is an old school way of coding and in ...`}
              </div>
              <div class="tags t-java t-jsp t-scriptlet">
                  <a  class="post-tag label label-warning" title="show questions tagged 'java'" rel="tag">java</a> <a  class="post-tag label label-warning" title="show questions tagged 'jsp'" rel="tag">jsp</a> <a  class="post-tag label label-warning" title="show questions tagged 'scriptlet'" rel="tag">scriptlet</a> 
              </div>
              <div class="started fr">
                  <div class="user-info user-hover">
                    <div class="user-action-time">
                        asked <span title="2010-07-05 07:24:06Z" class="relativetime">Jul 5 '10 at 7:24</span>
                    </div>
                    <div class="user-gravatar32">
                        <a >
                          <div class="gravatar-wrapper-32"><img src="https://www.gravatar.com/avatar/043703d9aa973023306d6562404804b7?s=32&amp;d=identicon&amp;r=PG" alt="" width="32" height="32" /></div>
                        </a>
                    </div>
                    <div class="user-details">
                        <a >former</a>
                        <div class="-flair">
                          <span class="reputation-score" title="reputation score " dir="ltr">8,175</span><span title="5 gold badges"><span class="badge1"></span><span class="badgecount">5</span></span><span title="17 silver badges"><span class="badge2"></span><span class="badgecount">17</span></span><span title="22 bronze badges"><span class="badge3"></span><span class="badgecount">22</span></span>
                        </div>
                    </div>
                  </div>
              </div>
            </div>
        </div>
        <div class="question-summary columns" id="question-summary-7229226">
            <div class="statscontainer col-2">
              <div class="stats">
                  <div class="vote">
                    <div class="votes">
                        <span class="vote-count-post "><strong>441</strong></span>
                        <div class="viewcount">votes</div>
                    </div>
                  </div>
                  <div class="status answered-accepted">
                    <strong>8</strong>answers
                  </div>
              </div>
              <div class="views hot" title="45,042 views">
                  45k views
              </div>
            </div>
            <div class="summary col-10">
              <h3><a  class="question-hyperlink text-dark" onClick={this.handleTitleClick} >Should I avoid the use of set(Preferred|Maximum|Minimum)Size methods in Java Swing?</a></h3>
              <button className="btn btn-sm" value="Should I avoid the use of set(Preferred|Maximum|Minimum)Size methods in Java Swing?" onClick={this.handleBookmark}>Click to bookmark this question</button>
              <div className="excerpt" onMouseUp={this.handleSelectedText}>
                  {`Several times I've been criticized for having suggested the use of the following methods:
                  setPreferredSize
                  setMinimumSize
                  setMaximumSize
                  on Swing components. I don't see any alternative to their use ...`}
              </div>
              <div class="tags t-java t-swing t-layout-manager">
                  <a  class="post-tag label label-warning" title="show questions tagged 'java'" rel="tag">java</a> <a  class="post-tag label label-warning" title="show questions tagged 'swing'" rel="tag">swing</a> <a  class="post-tag label label-warning" title="show questions tagged 'layout-manager'" rel="tag">layout-manager</a> 
              </div>
              <div class="started fr">
                  <div class="user-info ">
                    <div class="user-action-time">
                        asked <span title="2011-08-29 11:02:31Z" class="relativetime">Aug 29 '11 at 11:02</span>
                    </div>
                    <div class="user-gravatar32">
                        <a >
                          <div class="gravatar-wrapper-32"><img src="https://www.gravatar.com/avatar/11a0d222c5e2951d47f69a462fc14402?s=32&amp;d=identicon&amp;r=PG" alt="" width="32" height="32" /></div>
                        </a>
                    </div>
                    <div class="user-details">
                        <a >Heisenbug</a>
                        <div class="-flair">
                          <span class="reputation-score" title="reputation score 29,036" dir="ltr">29k</span><span title="22 gold badges"><span class="badge1"></span><span class="badgecount">22</span></span><span title="102 silver badges"><span class="badge2"></span><span class="badgecount">102</span></span><span title="171 bronze badges"><span class="badge3"></span><span class="badgecount">171</span></span>
                        </div>
                    </div>
                  </div>
              </div>
            </div>
        </div>
        <div class="question-summary columns" id="question-summary-504103">
            <div class="statscontainer col-2">
              <div class="stats">
                  <div class="vote">
                    <div class="votes">
                        <span class="vote-count-post "><strong>717</strong></span>
                        <div class="viewcount">votes</div>
                    </div>
                  </div>
                  <div class="status answered-accepted">
                    <strong>11</strong>answers
                  </div>
              </div>
              <div class="views hot" title="88,134 views">
                  88k views
              </div>
            </div>
            <div class="summary col-10">
              <h3><a  class="question-hyperlink text-dark" onClick={this.handleTitleClick} >How do I write a correct micro-benchmark in Java?</a></h3>
              <button className="btn btn-sm" value="How do I write a correct micro-benchmark in Java?" onClick={this.handleBookmark}>Click to bookmark this question</button>
              <div className="excerpt" onMouseUp={this.handleSelectedText}>
                  {`How do you write (and run) a correct micro-benchmark in Java?
                  I'm looking here for code samples and comments illustrating various things to think about.
                  Example: Should the benchmark measure time/...`}
              </div>
              <div class="tags t-java t-jvm t-benchmarking t-jvm-hotspot t-microbenchmark">
                  <a  class="post-tag label label-warning" title="show questions tagged 'java'" rel="tag">java</a> <a  class="post-tag label label-warning" title="show questions tagged 'jvm'" rel="tag">jvm</a> <a  class="post-tag label label-warning" title="show questions tagged 'benchmarking'" rel="tag">benchmarking</a> <a  class="post-tag label label-warning" title="show questions tagged 'jvm-hotspot'" rel="tag">jvm-hotspot</a> <a  class="post-tag label label-warning" title="show questions tagged 'microbenchmark'" rel="tag">microbenchmark</a> 
              </div>
              <div class="started fr">
                  <div class="user-info ">
                    <div class="user-action-time">
                        asked <span title="2009-02-02 17:39:41Z" class="relativetime">Feb 2 '09 at 17:39</span>
                    </div>
                    <div class="user-gravatar32">
                        <a >
                          <div class="gravatar-wrapper-32"><img src="https://www.gravatar.com/avatar/78443e56a77d9c3328197ee5c952c3d7?s=32&amp;d=identicon&amp;r=PG" alt="" width="32" height="32" /></div>
                        </a>
                    </div>
                    <div class="user-details">
                        <a >John Nilsson</a>
                        <div class="-flair">
                          <span class="reputation-score" title="reputation score " dir="ltr">9,417</span><span title="7 gold badges"><span class="badge1"></span><span class="badgecount">7</span></span><span title="25 silver badges"><span class="badge2"></span><span class="badgecount">25</span></span><span title="37 bronze badges"><span class="badge3"></span><span class="badgecount">37</span></span>
                        </div>
                    </div>
                  </div>
              </div>
            </div>
        </div>
        <div class="question-summary columns" id="question-summary-2770321">
            <div class="statscontainer col-2">
              <div class="stats">
                  <div class="vote">
                    <div class="votes">
                        <span class="vote-count-post "><strong>529</strong></span>
                        <div class="viewcount">votes</div>
                    </div>
                  </div>
                  <div class="status answered">
                    <strong>14</strong>answers
                  </div>
              </div>
              <div class="views supernova" title="172,855 views">
                  173k views
              </div>
            </div>
            <div class="summary col-10">
              <h3><a  class="question-hyperlink text-dark" onClick={this.handleTitleClick} >What is a raw type and why shouldn't we use it?</a></h3>
              <button className="btn btn-sm" value="What is a raw type and why shouldn't we use it?" onClick={this.handleBookmark}>Click to bookmark this question</button>
              <div className="excerpt" onMouseUp={this.handleSelectedText}>
                  {`Questions:
                  What are raw types in Java, and why do I often hear that they shouldn't be used in new code?
                  What is the alternative if we can't use raw types, and how is it better?`}
              </div>
              <div class="tags t-java t-generics t-raw-types">
                  <a  class="post-tag label label-warning" title="show questions tagged 'java'" rel="tag">java</a> <a  class="post-tag label label-warning" title="show questions tagged 'generics'" rel="tag">generics</a> <a  class="post-tag label label-warning" title="show questions tagged 'raw-types'" rel="tag">raw-types</a> 
              </div>
              <div class="started fr">
                  <div class="user-info user-hover">
                    <div class="user-action-time">
                        asked <span title="2010-05-05 02:48:53Z" class="relativetime">May 5 '10 at 2:48</span>
                    </div>
                    <div class="user-gravatar32">
                        <a >
                          <div class="gravatar-wrapper-32"><img src="https://www.gravatar.com/avatar/30fe97e726af0ea4ff8b756fbf2e6d15?s=32&amp;d=identicon&amp;r=PG" alt="" width="32" height="32" /></div>
                        </a>
                    </div>
                    <div class="user-details">
                        <a >polygenelubricants</a>
                        <div class="-flair">
                          <span class="reputation-score" title="reputation score 272,751" dir="ltr">273k</span><span title="98 gold badges"><span class="badge1"></span><span class="badgecount">98</span></span><span title="500 silver badges"><span class="badge2"></span><span class="badgecount">500</span></span><span title="587 bronze badges"><span class="badge3"></span><span class="badgecount">587</span></span>
                        </div>
                    </div>
                  </div>
              </div>
            </div>
        </div>
        <div class="question-summary columns" id="question-summary-17874717">
            <div class="statscontainer col-2">
              <div class="stats">
                  <div class="vote">
                    <div class="votes">
                        <span class="vote-count-post "><strong>138</strong></span>
                        <div class="viewcount">votes</div>
                    </div>
                  </div>
                  <div class="status answered-accepted">
                    <strong>6</strong>answers
                  </div>
              </div>
              <div class="views hot" title="33,111 views">
                  33k views
              </div>
            </div>
            <div class="summary col-10">
              <h3><a  class="question-hyperlink text-dark" onClick={this.handleTitleClick} >Providing white space in a Swing GUI</a></h3>
              <button className="btn btn-sm" value="Providing white space in a Swing GUI" onClick={this.handleBookmark}>Click to bookmark this question</button>
              <div className="excerpt" onMouseUp={this.handleSelectedText}>
                  {`A GUI with no white space appears 'crowded'.  How can I provide white space without resorting to explicitly setting the position or size of components?­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­­...`}
              </div>
              <div class="tags t-java t-swing t-whitespace t-layout-manager">
                  <a  class="post-tag label label-warning" title="show questions tagged 'java'" rel="tag">java</a> <a  class="post-tag label label-warning" title="show questions tagged 'swing'" rel="tag">swing</a> <a  class="post-tag label label-warning" title="show questions tagged 'whitespace'" rel="tag">whitespace</a> <a  class="post-tag label label-warning" title="show questions tagged 'layout-manager'" rel="tag">layout-manager</a> 
              </div>
              <div class="started fr">
                  <div class="user-info user-hover">
                    <div class="user-action-time">
                        asked <span title="2013-07-26 06:50:12Z" class="relativetime">Jul 26 '13 at 6:50</span>
                    </div>
                    <div class="user-gravatar32">
                        <a >
                          <div class="gravatar-wrapper-32"><img src="https://i.stack.imgur.com/yOfDr.png?s=32&amp;g=1" alt="" width="32" height="32" /></div>
                        </a>
                    </div>
                    <div class="user-details">
                        <a >Andrew Thompson</a>
                        <div class="-flair">
                          <span class="reputation-score" title="reputation score 151,432" dir="ltr">151k</span><span title="24 gold badges"><span class="badge1"></span><span class="badgecount">24</span></span><span title="158 silver badges"><span class="badge2"></span><span class="badgecount">158</span></span><span title="326 bronze badges"><span class="badge3"></span><span class="badgecount">326</span></span>
                        </div>
                    </div>
                  </div>
              </div>
            </div>
        </div>
        <div class="question-summary columns" id="question-summary-2591098">
            <div class="statscontainer col-2">
              <div class="stats">
                  <div class="vote">
                    <div class="votes">
                        <span class="vote-count-post "><strong>780</strong></span>
                        <div class="viewcount">votes</div>
                    </div>
                  </div>
                  <div class="status answered">
                    <strong>29</strong>answers
                  </div>
              </div>
              <div class="views supernova" title="1,208,241 views">
                  1.2m views
              </div>
            </div>
            <div class="summary col-10">
              <h3><a  class="question-hyperlink text-dark" onClick={this.handleTitleClick} >How to parse JSON in Java</a></h3>
              <button className="btn btn-sm" value="How to parse JSON in Java" onClick={this.handleBookmark}>Click to bookmark this question</button>
              <div className="excerpt" onMouseUp={this.handleSelectedText}>
                  {`I have the following JSON text. How can I parse it to get pageName, pagePic, post_id, etc.?
                  {
                  "pageInfo": {
                  "pageName": "abc",
                  "pagePic": "http://example.com/content.jpg"
                  }
                  ...`}
              </div>
              <div class="tags t-java t-json t-parsing">
                  <a  class="post-tag label label-warning" title="show questions tagged 'java'" rel="tag">java</a> <a  class="post-tag label label-warning" title="show questions tagged 'json'" rel="tag">json</a> <a  class="post-tag label label-warning" title="show questions tagged 'parsing'" rel="tag">parsing</a> 
              </div>
              <div class="started fr">
                  <div class="user-info user-hover">
                    <div class="user-action-time">
                        asked <span title="2010-04-07 09:00:21Z" class="relativetime">Apr 7 '10 at 9:00</span>
                    </div>
                    <div class="user-gravatar32">
                        <a >
                          <div class="gravatar-wrapper-32"><img src="https://www.gravatar.com/avatar/c4c74fddc6280a68216b1d5bb93d070d?s=32&amp;d=identicon&amp;r=PG" alt="" width="32" height="32" /></div>
                        </a>
                    </div>
                    <div class="user-details">
                        <a >Muhammad Maqsoodur Rehman</a>
                        <div class="-flair">
                          <span class="reputation-score" title="reputation score 12,367" dir="ltr">12.4k</span><span title="33 gold badges"><span class="badge1"></span><span class="badgecount">33</span></span><span title="70 silver badges"><span class="badge2"></span><span class="badgecount">70</span></span><span title="114 bronze badges"><span class="badge3"></span><span class="badgecount">114</span></span>
                        </div>
                    </div>
                  </div>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Home;
