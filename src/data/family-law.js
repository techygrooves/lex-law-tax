/*
 * Family & Matrimonial Law
 * ------------------------
 * The /family-law/ section: one hub and thirteen topic pages. The build
 * places the hub after Property Law and Registration in the list of
 * detailed sections, adds it to the Practice Areas menu, and renders each
 * article through the same template as the property articles.
 *
 * WRITING RULES (in addition to those at the top of legal-services.js)
 *
 *   - Every page opens with the practical question it answers, and
 *     explains a legal term where it is first used.
 *   - Personal law and the Special Marriage Act, 1954 are distinguished
 *     wherever the answer differs.
 *   - Criminal-law references give both the Bharatiya Nyaya Sanhita /
 *     Bharatiya Nagarik Suraksha Sanhita provision and the former IPC /
 *     CrPC provision, because case papers from before 1 July 2024 use the
 *     old numbering.
 *   - No court fee, registration fee, stamp duty or government charge is
 *     stated. No outcome or timeline is promised; periods fixed by statute
 *     are stated as the statute fixes them.
 *   - A few decisions are named where the current position depends on
 *     them and a reader or lawyer will want to look them up. Each was
 *     checked when the page was written (see `lastReviewed` below).
 *   - Nothing here says the firm offers a particular service. The pages
 *     explain; the contact page is the route to the office.
 *
 * Official sources linked from these pages were opened and checked on
 * 24 November 2026: the Uttar Pradesh Stamp and Registration Department's
 * marriage registration page and the Uttar Pradesh Marriage Registration
 * Rules, 2017 on igrsup.gov.in, and India Code for central Acts.
 *
 * After editing, run:  node tools/build-pages.js
 */

(function () {
  /* Official sources. Opened and checked on 24 November 2026, except the
     two marked: those sites refused connections from outside India when
     checked, and the addresses are their long-standing official ones. */
  var UP_MARRIAGE_PORTAL = "https://igrsup.gov.in/igrsupMarriageRegistration/mr_homePage";
  var UP_MARRIAGE_RULES = "https://igrsup.gov.in/prernadoc/upMarriageAct2017.pdf";
  var INDIA_CODE = "https://www.indiacode.nic.in/";
  var LUCKNOW_COURTS = "https://districts.ecourts.gov.in/lucknow"; /* not reachable from outside India when checked */
  var NALSA = "https://nalsa.gov.in/"; /* not reachable from outside India when checked */

  function link(href, text) {
    return '<a href="' + href + '" rel="noopener noreferrer">' + text + "</a>";
  }

  var portal = link(UP_MARRIAGE_PORTAL, "marriage registration page of the Uttar Pradesh Stamp and Registration Department");
  var rules2017 = link(UP_MARRIAGE_RULES, "Uttar Pradesh Marriage Registration Rules, 2017");
  var indiaCode = link(INDIA_CODE, "India Code");
  var lucknowCourts = link(LUCKNOW_COURTS, "Lucknow district court&rsquo;s eCourts website");
  var nalsa = link(NALSA, "National Legal Services Authority");

  var PUBLISHED = "2026-11-24";
  var REVIEWED = "2026-11-24";

  function article(o) {
    return Object.assign({ datePublished: PUBLISHED, dateModified: REVIEWED }, o);
  }

  window.familyLaw = {
    hub: {
      slug: "family-law",
      name: "Family & Matrimonial Law",
      h1: "Family & Matrimonial Law in Lucknow",
      title: "Family & Matrimonial Law in Lucknow | H.R. Legal Associate",
      description:
        "Plain-English guidance on court marriage and registration, divorce, separation, maintenance, child custody, domestic violence, stridhan, mediation and settlements in Lucknow.",
      image: "about",
      lastReviewed: REVIEWED,
      lead:
        "Family and matrimonial law deals with marriage, separation and divorce, and with the support, safety, children and belongings that go with them. These pages explain each situation in plain English, starting from the question you are likely to be asking.",
      intro: [
        "A family matter is often the first time a person deals with the law at all, and it usually arrives at a difficult moment. The questions are practical ones. How do we register our marriage? We have been living apart for a year &mdash; are we separated? I have received a notice from the Family Court &mdash; what happens now? Who keeps the children during the school holidays? How do I get my jewellery back?",
        "Which law answers those questions depends first on how the marriage was solemnised. Hindus, Buddhists, Jains and Sikhs are governed by the Hindu Marriage Act, 1955. Muslims, Christians and Parsis have their own personal laws. A couple who married under the Special Marriage Act, 1954 &mdash; the civil law that applies regardless of religion &mdash; is governed by that Act instead. The same question can have a different answer under each, and the pages below say where it does.",
        "Most matrimonial cases in Lucknow are heard by the Family Court, which is required by law to try to bring the parties to a settlement before it decides a dispute. Criminal complaints, applications under the domestic violence law and some maintenance applications go before the Magistrate. Each page explains which forum is involved and what the stages look like.",
        "The pages are grouped by situation. Choose the one closest to yours; each links to the related topics. Nothing here is a substitute for advice on your own documents, and if you need to discuss a family matter with H.R. Legal Associate, the Lucknow office can be reached through the contact page."
      ],
      servicesEyebrow: "Topics",
      servicesTitle: "Find the Situation That Applies to You",
      servicesLead: "Thirteen topics in four groups. Each page opens with the question it answers.",
      backLabel: "All family and matrimonial law topics",
      relatedTitle: "Related Topics",
      groups: [
        {
          title: "Marriage & Registration",
          lead: "Getting married in court, or registering a marriage that has already taken place.",
          pages: ["court-marriage-registration"]
        },
        {
          title: "Separation & Divorce",
          lead: "Ending a marriage by agreement or through a contested case, separating without divorce, and the related petitions.",
          pages: [
            "mutual-consent-divorce",
            "contested-divorce",
            "judicial-separation",
            "marriage-annulment",
            "restitution-of-conjugal-rights"
          ]
        },
        {
          title: "Children & Financial Support",
          lead: "Maintenance for a spouse and children, and where the children live and how they keep in touch with the other parent.",
          pages: ["maintenance", "child-custody"]
        },
        {
          title: "Protection & Dispute Resolution",
          lead: "Safety and criminal complaints, the return of belongings, and settling a dispute through mediation and a written agreement.",
          pages: [
            "domestic-violence",
            "dowry-harassment-cruelty",
            "stridhan-recovery",
            "mediation",
            "matrimonial-settlement-agreement"
          ]
        }
      ],
      faqs: [
        [
          "Which court in Lucknow hears divorce and custody cases?",
          "Divorce, judicial separation, annulment, restitution of conjugal rights, custody and most maintenance claims between spouses are heard by the Family Court at Lucknow where the petition can be filed there. Applications under the Protection of Women from Domestic Violence Act, 2005 go to the Magistrate, as do criminal complaints. Which court has jurisdiction over a particular case also depends on where the marriage was solemnised and where each party lives, and is confirmed before anything is filed."
        ],
        [
          "Does our religion decide which law applies to our marriage?",
          "Usually the form of the marriage decides it. A marriage solemnised by Hindu rites is governed by the Hindu Marriage Act, 1955; a marriage solemnised or registered under the Special Marriage Act, 1954 is governed by that Act, whatever the couple&rsquo;s religion; Muslim, Christian and Parsi marriages are governed by their own personal laws. Where the answer to a question differs between these laws, the relevant page says so."
        ],
        [
          "Does every family dispute have to end up in a long court case?",
          "No. The Family Court is required to try to bring the parties to a settlement, and most courts refer matrimonial disputes to mediation at an early stage. Many disputes are resolved by agreement &mdash; on divorce, maintenance, the children and belongings &mdash; and the agreement is then recorded before the court. Mediation and settlement agreements each have their own page."
        ],
        [
          "What should I bring to a first discussion about a family matter?",
          "Bring proof of the marriage (a certificate, invitation card or photographs), any notice, petition, complaint or court order you have received, a short dated account of what has happened, and records relevant to the issue &mdash; income documents for maintenance, school records for custody, or a list of jewellery and gifts for stridhan. Each topic page has its own document checklist."
        ]
      ]
    },

    articles: [
      /* ============================================================ */
      /* 1. COURT MARRIAGE & MARRIAGE REGISTRATION                     */
      /* ============================================================ */
      article({
        slug: "court-marriage-registration",
        navLabel: "Court Marriage & Marriage Registration",
        name: "Court Marriage & Marriage Registration in Lucknow",
        h1: "Court Marriage & Marriage Registration in Lucknow",
        title: "Court Marriage & Marriage Registration in Lucknow: Steps and Documents",
        description:
          "How to marry under the Special Marriage Act in Lucknow, and how to register a marriage already solemnised, on the Uttar Pradesh portal: notice, witnesses and documents.",
        summary:
          "Two routes explained step by step: marrying before the Marriage Officer, and registering a marriage that has already taken place.",
        linkLabel: "Read the court marriage and registration guide",
        lead:
          "&ldquo;We want to get married &mdash; where do we begin?&rdquo; and &ldquo;We are already married &mdash; how do we register it?&rdquo; are two different questions with two different procedures. This page takes each in turn, with the notice, witness and document requirements that apply in Lucknow.",
        sections: [
          {
            id: "two-routes",
            heading: "Two different things people call &ldquo;court marriage&rdquo;",
            paras: [
              "In everyday speech, &ldquo;court marriage&rdquo; usually means a marriage solemnised before a government Marriage Officer under the <strong>Special Marriage Act, 1954</strong>. That Act is a civil marriage law: it applies whatever the religion of the couple, and does not need any religious ceremony. It is the usual route for couples of different faiths, and for any couple who prefer a civil marriage.",
              "<strong>Registration</strong> is something else. A marriage solemnised by religious ceremony &mdash; for example by Hindu rites, including the <em>saptapadi</em> (the seven steps around the sacred fire) &mdash; is valid once the ceremony is performed. Registration records that marriage officially and gives the couple a certificate. In Uttar Pradesh, registration of marriages has been compulsory since the State notified the " + rules2017 + " on 3 August 2017."
            ],
            table: {
              caption: "Which route fits your situation",
              head: ["Your situation", "Route", "Where it is done"],
              rows: [
                ["You have not yet married and want a civil marriage", "Solemnisation under the Special Marriage Act, 1954", "Before the Marriage Officer for the district"],
                ["You married by religious ceremony and want a certificate", "Registration under the Uttar Pradesh Marriage Registration Rules, 2017 (and, for Hindu marriages, the Hindu Marriage Registration Rules, 1973)", "Online application, then the registration office you choose"],
                ["You married by religious ceremony and want the marriage registered under the Special Marriage Act", "Registration of an existing marriage under section 15 of the Special Marriage Act", "Before the Marriage Officer for the district"]
              ]
            }
          },
          {
            id: "getting-married",
            heading: "&ldquo;We want to get married. Where do we begin?&rdquo;",
            paras: [
              "Under the Special Marriage Act, both parties must be unmarried (no living spouse), capable of giving valid consent, outside the degrees of relationship the Act prohibits, and of age: <strong>21 for the man and 18 for the woman</strong>. The steps are set by the Act itself."
            ],
            list: [
              "<strong>Notice of intended marriage.</strong> The couple give written notice, in the form set out in the Act, to the Marriage Officer of the district in which at least one of them has lived for at least <strong>30 days</strong> immediately before the notice. For a marriage in Lucknow, that means at least one of you must have lived in Lucknow district for the 30 days before giving notice.",
              "<strong>Publication and objections.</strong> The Act provides for the notice to be entered in the Marriage Notice Book and published, and for anyone to object within 30 days on the ground that a legal condition is not met. In Uttar Pradesh, the Allahabad High Court held in January 2021 (<em>Safiya Sultana v. State of U.P.</em>) that publication of the notice and the call for objections are not compulsory: the Marriage Officer publishes the notice only if the couple ask for it in writing. If you do not ask, the officer does not publish it or entertain objections, and proceeds to the solemnisation after checking identity, age and consent.",
              "<strong>Declarations and solemnisation.</strong> On the date fixed, both parties and <strong>three witnesses</strong> sign declarations in the form the Act prescribes, in the presence of the Marriage Officer. The marriage is solemnised at the Marriage Officer&rsquo;s office, or at another place nearby, in any form the parties choose, provided each says to the other, before the officer and the witnesses, that they take the other as their lawful spouse.",
              "<strong>Certificate.</strong> The Marriage Officer enters the marriage in the Marriage Certificate Book, signed by the couple and the three witnesses. That entry is conclusive evidence that the marriage was solemnised under the Act."
            ],
            after: [
              "Ask the Marriage Officer&rsquo;s office in advance how it schedules the solemnisation date and which identity and address documents it accepts, because offices apply their own working arrangements to the Act&rsquo;s requirements. The full text of the Act is on " + indiaCode + "."
            ]
          },
          {
            id: "already-married",
            heading: "&ldquo;We are already married. How do we register our marriage?&rdquo;",
            paras: [
              "Marriages in Uttar Pradesh are registered online through the " + portal + ". The steps below are taken from the department&rsquo;s own instructions on that page."
            ],
            list: [
              "Fill in the application form in <strong>both Hindi and English</strong> &mdash; the portal requires both.",
              "Upload a recent photograph of each spouse (the portal asks for a JPG under 40 KB) and each spouse&rsquo;s <strong>identity proof, age proof and residence proof</strong> (PDF, up to 70 KB each). Give the same address as the one on the residence proof you upload.",
              "Upload the identity, age and residence proof of <strong>two witnesses</strong>.",
              "Upload the <strong>affidavit of the bride and groom</strong>, in the format the portal provides, after it has been attested by a notary. The portal also provides a format for an affidavit from the religious authority who performed the marriage.",
              "Check the preview, save the application, and keep the application number and password it gives you.",
              "Pay the fee online and keep the payment receipt.",
              "<strong>Within 30 days</strong> of completing the application, go to the registration office you selected, with all the original documents."
            ],
            after: [
              "The portal warns that if an attached certificate or affidavit is found to be incorrect, the registration certificate can be cancelled &mdash; so the documents must match each other and the facts. The portal does not publish the fee on its instructions page; it is shown during the application. If you would rather register an existing marriage under the Special Marriage Act, section 15 of that Act allows it where the conditions it lists are met, after notice to the Marriage Officer and the period it provides for objections."
            ]
          },
          {
            id: "documents",
            heading: "Document checklist",
            list: [
              "Identity proof for each of you (the online route relies on Aadhaar-based verification)",
              "Age proof for each of you, such as a school-leaving or birth certificate",
              "Residence proof for each of you; for a Special Marriage Act notice, proof that one of you has lived in Lucknow district for the last 30 days",
              "Recent photographs",
              "Two witnesses for registration of an existing marriage, or three for a marriage under the Special Marriage Act, each with identity, age and address proof",
              "For registration of an existing marriage: the notarised affidavit, and evidence of the ceremony such as the invitation card and photographs",
              "If either of you was married before: the divorce decree, or the death certificate of the former spouse"
            ]
          },
          {
            id: "mistakes",
            heading: "Common problems to avoid",
            list: [
              "<strong>Mismatched details.</strong> A name, date of birth or address spelt differently across documents is the most common reason an application is held up. Correct it before applying, not at the counter.",
              "<strong>The wrong district.</strong> A Special Marriage Act notice must go to the Marriage Officer of a district where one of you has actually lived for the last 30 days.",
              "<strong>An earlier marriage not formally ended.</strong> A person whose earlier marriage has not been dissolved by a decree cannot marry again under any of these laws; the second marriage would be void and may be an offence.",
              "<strong>Leaving it late.</strong> Registration is compulsory in Uttar Pradesh. A certificate is usually needed for a passport, a visa, a bank account in a joint name, insurance and many other purposes, and is far easier to obtain soon after the wedding."
            ]
          }
        ],
        faqs: [
          [
            "Can we marry under the Special Marriage Act if our families object?",
            "The Act&rsquo;s conditions are about the couple: age, consent, marital status and prohibited relationships. Family approval is not one of them. An objection can be made only on the ground that one of those legal conditions is not met, and in Uttar Pradesh the notice is published for objections only if the couple ask for it. A couple who face threats can ask the police or the High Court for protection."
          ],
          [
            "Is a temple or Arya Samaj certificate enough on its own?",
            "A certificate from the place where the ceremony was performed is evidence that a ceremony took place, but it is not a registration certificate. In Uttar Pradesh the marriage must also be registered under the 2017 Rules. The religious authority&rsquo;s affidavit is one of the documents the registration portal provides a format for."
          ],
          [
            "One of us lives outside Lucknow. Where do we give notice?",
            "Under the Special Marriage Act, notice goes to the Marriage Officer of the district where at least one of you has lived for the 30 days before the notice. If only one of you meets that condition in Lucknow, the notice can be given in Lucknow. For registration of an existing marriage, the portal lets you choose the registration office."
          ],
          [
            "We married years ago and never registered. Is it too late?",
            "No. An existing marriage can still be registered through the portal. Expect to explain the delay and to produce more evidence of the ceremony &mdash; photographs, the invitation card, and the witnesses who were present."
          ]
        ],
        related: [
          ["Marriage Annulment &amp; Nullity", "family-law/marriage-annulment/index.html"],
          ["Mutual Consent Divorce", "family-law/mutual-consent-divorce/index.html"],
          ["Maintenance &amp; Alimony", "family-law/maintenance/index.html"],
          ["Contact the Lucknow office", "contact/index.html"]
        ]
      }),

      /* ============================================================ */
      /* 2. MUTUAL CONSENT DIVORCE                                     */
      /* ============================================================ */
      article({
        slug: "mutual-consent-divorce",
        navLabel: "Mutual Consent Divorce",
        name: "Mutual Consent Divorce in Lucknow",
        h1: "Mutual Consent Divorce in Lucknow: Joint Petition, Waiting Period and Waiver",
        title: "Mutual Consent Divorce in Lucknow: Joint Petition and Waiting Period",
        description:
          "How a joint divorce petition works in the Lucknow Family Court: what to agree first, documents, the first and second motion, the six-month period and when it may be waived.",
        summary:
          "How spouses who both want a divorce file one joint petition, what to settle first, and how the six-month waiting period works.",
        linkLabel: "Read the mutual consent divorce guide",
        lead:
          "&ldquo;We have both decided to end the marriage. What is the simplest lawful way?&rdquo; Where both spouses agree, the law allows a joint petition for divorce by mutual consent. This page explains the conditions, what to settle before filing, and the stages that follow.",
        sections: [
          {
            id: "conditions",
            heading: "When a joint petition can be filed",
            paras: [
              "Under section 13B of the <strong>Hindu Marriage Act, 1955</strong> (and section 28 of the <strong>Special Marriage Act, 1954</strong>, which is in the same terms), husband and wife may jointly ask the court to dissolve the marriage if they have been <strong>living separately for one year or more</strong>, have not been able to live together, and have mutually agreed that the marriage should be dissolved.",
              "&ldquo;Living separately&rdquo; does not have to mean living in different cities, or even in different houses. It means not living as husband and wife. What matters is that the separation has lasted a year before the petition is presented.",
              "Other personal laws have their own provisions. Under the <strong>Divorce Act, 1869</strong>, which applies to Christians, a joint petition requires two years of separation. Muslim law allows a marriage to be dissolved by mutual agreement outside court (<em>mubara&rsquo;at</em>), but the terms are still best recorded in writing, and court proceedings may follow on maintenance or other issues."
            ]
          },
          {
            id: "agree-first",
            heading: "What to agree before you file",
            paras: [
              "A mutual consent petition depends on the consent of both spouses continuing to the very end. Either spouse can withdraw consent at any time before the decree, and if that happens the petition fails. That is why everything that matters should be settled, and written down, before the petition is filed:"
            ],
            list: [
              "The total amount of permanent alimony (a one-time payment or periodic maintenance), and when and how it is paid &mdash; commonly split between the first and second motions",
              "Return of jewellery, gifts and belongings (stridhan), with a list",
              "Where the children will live, how the other parent will see them and talk to them, and who pays for their schooling",
              "What happens to any jointly owned property, joint accounts and loans",
              "What happens to any other case between the spouses or their families &mdash; maintenance, domestic violence or criminal cases &mdash; and who takes which step to close it"
            ],
            after: [
              "These terms are usually written into a settlement agreement, often reached in mediation. See " + "<a href=\"../matrimonial-settlement-agreement/index.html\">Matrimonial Settlement Agreements</a> and <a href=\"../mediation/index.html\">Family Court Mediation</a>."
            ]
          },
          {
            id: "stages",
            heading: "The stages of a mutual consent divorce",
            list: [
              "<strong>The joint petition (first motion).</strong> Both spouses sign one petition, supported by affidavits, setting out the date and place of marriage, the period of separation, the agreed terms, and that consent has not been obtained by force, fraud or undue influence. It is filed in the Family Court that has jurisdiction &mdash; generally where the marriage was solemnised, where the other party lives, where the couple last lived together, or, if the wife is the petitioner, where she lives.",
              "<strong>Statements before the court.</strong> Both spouses appear and the court records their statements confirming consent and the terms.",
              "<strong>The waiting period.</strong> The Act provides that the second motion may be made not earlier than <strong>six months</strong> after the petition is presented, and not later than eighteen months. The period exists so that the spouses have time to reconsider.",
              "<strong>Second motion.</strong> Both spouses appear again, confirm that their consent continues, and confirm that the agreed terms have been or will be carried out.",
              "<strong>Decree.</strong> If the court is satisfied, it passes a decree of divorce. A certified copy of the decree is the document you will need later &mdash; for example to remarry or to change records."
            ]
          },
          {
            id: "waiver",
            heading: "Can the six-month waiting period be waived?",
            paras: [
              "Sometimes. The Supreme Court held in <em>Amardeep Singh v. Harveen Kaur</em> (2017) that the six-month period is not mandatory and that the court may waive it. The court considers whether the statutory period of separation and the waiting period together (about eighteen months) have already passed, whether attempts at mediation or reconciliation have failed, whether the parties have genuinely settled all their differences including alimony and custody, and whether waiting would only prolong their distress.",
              "An application for waiver is made after the first motion. Whether it is granted is for the court in each case; there is no right to it. Separately, the Supreme Court has held that it can itself dissolve a marriage that has irretrievably broken down, using its special constitutional power under Article 142 &mdash; a power that the Family Court does not have."
            ]
          },
          {
            id: "documents",
            heading: "Document checklist",
            list: [
              "Marriage certificate, or the invitation card and photographs if the marriage was not registered",
              "Proof of identity and address of both spouses",
              "Recent photographs of both spouses",
              "Details of the period of separation and where each spouse has been living",
              "The signed settlement terms, or a clear note of what has been agreed",
              "Details of any other pending case between the spouses (court, case number, stage)",
              "Birth certificates of any children"
            ]
          }
        ],
        faqs: [
          [
            "Do both of us have to come to court?",
            "Ordinarily, yes. The court has to be satisfied that both spouses consent, so both are usually present when their statements are recorded and at the second motion. Where one spouse lives abroad, courts have in suitable cases permitted appearance through video conferencing or a representative; whether that is possible depends on the court."
          ],
          [
            "Can my spouse withdraw consent after the first motion?",
            "Yes. Consent must continue until the decree. If one spouse withdraws it before the second motion, the court cannot grant a mutual consent divorce. This is why payment and other terms are often staged, with part paid at the first motion and the rest at the second."
          ],
          [
            "We married less than a year ago. Can we file?",
            "A mutual consent petition needs at least one year of living separately before it is presented, so it cannot be filed in the first year of marriage. Separately, the Hindu Marriage Act generally bars any divorce petition within one year of the marriage unless the court allows it on the ground of exceptional hardship or depravity."
          ],
          [
            "Is a divorce agreed on stamp paper, without going to court, valid?",
            "For a marriage under the Hindu Marriage Act or the Special Marriage Act, no. Only a court decree dissolves the marriage. A written agreement is useful evidence of the terms, but the spouses remain married until the court passes a decree."
          ]
        ],
        related: [
          ["Matrimonial Settlement Agreements", "family-law/matrimonial-settlement-agreement/index.html"],
          ["Family Court Mediation", "family-law/mediation/index.html"],
          ["Contested Divorce", "family-law/contested-divorce/index.html"],
          ["Maintenance &amp; Alimony", "family-law/maintenance/index.html"]
        ]
      }),

      /* ============================================================ */
      /* 3. CONTESTED DIVORCE                                          */
      /* ============================================================ */
      article({
        slug: "contested-divorce",
        navLabel: "Contested Divorce",
        name: "Contested Divorce in Lucknow",
        h1: "Contested Divorce in Lucknow: Grounds, Stages and Responding to a Notice",
        title: "Contested Divorce in Lucknow: Grounds, Stages and Your Reply",
        description:
          "What happens when one spouse seeks divorce and the other does not agree: the petition, notice, written statement, evidence and hearings, and what to do if you have received a divorce notice.",
        summary:
          "What happens when one spouse asks for a divorce and the other does not agree, from the petition to the final hearing.",
        linkLabel: "Read the contested divorce guide",
        lead:
          "&ldquo;My spouse will not agree to a divorce. Can I still get one?&rdquo; Yes, if you can prove a ground the law recognises. A contested divorce is a full case in which the court decides on evidence. This page explains the grounds, each stage, and what to do if you are the one who has received the notice.",
        sections: [
          {
            id: "grounds",
            heading: "The grounds a court can act on",
            paras: [
              "A contested divorce must rest on a ground set out in the law that governs the marriage. Under section 13 of the <strong>Hindu Marriage Act, 1955</strong>, the grounds available to either spouse include that the other has:"
            ],
            list: [
              "treated the petitioner with <strong>cruelty</strong> &mdash; conduct of such a kind that the petitioner cannot reasonably be expected to continue living with the other spouse",
              "<strong>deserted</strong> the petitioner for a continuous period of at least two years before the petition, without reasonable cause and without consent",
              "had voluntary sexual intercourse with someone else after the marriage",
              "ceased to be a Hindu by converting to another religion",
              "been incurably of unsound mind, or suffered from a mental disorder of such a kind that the petitioner cannot reasonably be expected to live with them",
              "renounced the world by entering a religious order, or not been heard of as alive for seven years or more"
            ],
            after: [
              "A divorce can also be sought where, after a decree of judicial separation or of restitution of conjugal rights, the spouses have not resumed living together for one year. A wife has some additional grounds under the Act. The <strong>Special Marriage Act, 1954</strong> (section 27) has a similar list. Muslim wives may seek dissolution under the <strong>Dissolution of Muslim Marriages Act, 1939</strong>, and Christians under the <strong>Divorce Act, 1869</strong>, each on the grounds those Acts set out."
            ]
          },
          {
            id: "stages",
            heading: "How a contested divorce proceeds",
            list: [
              "<strong>Petition.</strong> The petitioner files a petition in the Family Court with jurisdiction, setting out the marriage, the facts relied on and the ground, supported by an affidavit.",
              "<strong>Notice.</strong> The court issues notice (summons) to the other spouse, the respondent, with a copy of the petition and a date to appear.",
              "<strong>Counselling and mediation.</strong> The Family Court is required to try to bring the parties to a settlement, and usually refers them to counselling or to mediation early on. If they settle, the case can be converted into a mutual consent petition.",
              "<strong>Written statement.</strong> If the case continues, the respondent files a written reply, admitting or denying each statement and setting out their own version. Claims such as maintenance during the case are often made by separate application at this stage.",
              "<strong>Issues and evidence.</strong> The court frames the questions it must decide. Each side gives evidence &mdash; usually by affidavit, followed by cross-examination by the other side &mdash; and produces documents and witnesses.",
              "<strong>Arguments and judgment.</strong> After evidence, both sides argue and the court decides whether the ground is proved. If it is, a decree of divorce follows. An appeal lies to the High Court within the time the law allows."
            ],
            after: [
              "A contested divorce usually takes considerably longer than a mutual consent divorce, and its length depends on the court, the number of witnesses and the conduct of both sides. Case status and dates for the Lucknow courts can be checked on the " + lucknowCourts + "."
            ]
          },
          {
            id: "received-notice",
            heading: "If you have just received a divorce notice",
            list: [
              "<strong>Do not ignore it.</strong> If you do not appear on the date given, the court can proceed in your absence (ex parte) and may grant the divorce without hearing you.",
              "<strong>Read the petition carefully</strong> and note the date of appearance, the court, the case number and the ground alleged.",
              "<strong>Write down your own account</strong> of each allegation while events are fresh, with dates, and collect anything that supports it: messages, emails, photographs, medical records, and the names of people who know the facts.",
              "<strong>Consider what you want.</strong> You may oppose the divorce, agree to a divorce on terms, or seek maintenance, custody or the return of belongings. The written statement is where your position is first put on record.",
              "<strong>Keep to the time limits</strong> the court gives for filing the reply and documents. Delay can lead to your right to file being closed."
            ]
          },
          {
            id: "documents",
            heading: "Document checklist",
            list: [
              "Proof of marriage, and the children&rsquo;s birth certificates",
              "The petition, notice and every order received, if you are the respondent",
              "A dated account of the events relied on",
              "Supporting evidence: messages, emails, letters, photographs, medical and police records",
              "Names and contact details of witnesses",
              "Income and expense records if maintenance or alimony is in issue"
            ]
          }
        ],
        faqs: [
          [
            "Can my spouse stop the divorce just by refusing to agree?",
            "In a contested case the court does not need the respondent&rsquo;s agreement. It decides whether the ground relied on is proved. Refusal to agree matters for a mutual consent divorce, not for a contested one."
          ],
          [
            "Is &ldquo;irretrievable breakdown of marriage&rdquo; a ground in the Family Court?",
            "Not as a separate statutory ground under the Hindu Marriage Act. The Supreme Court has held that it can dissolve a marriage that has irretrievably broken down using its special power under Article 142 of the Constitution, but that power belongs to the Supreme Court alone. In the Family Court, a divorce has to rest on a ground in the governing Act."
          ],
          [
            "Can we still settle after the case has started?",
            "Yes, at any stage before the decree. The parties can settle in mediation or between themselves, and a contested petition is often converted into a mutual consent petition, or withdrawn, once a settlement is recorded."
          ]
        ],
        related: [
          ["Mutual Consent Divorce", "family-law/mutual-consent-divorce/index.html"],
          ["Judicial Separation", "family-law/judicial-separation/index.html"],
          ["Family Court Mediation", "family-law/mediation/index.html"],
          ["Maintenance &amp; Alimony", "family-law/maintenance/index.html"]
        ]
      }),

      /* ============================================================ */
      /* 4. JUDICIAL SEPARATION                                        */
      /* ============================================================ */
      article({
        slug: "judicial-separation",
        navLabel: "Judicial Separation",
        name: "Judicial Separation in Lucknow",
        h1: "Judicial Separation: Living Apart, a Separation Order and Divorce Compared",
        title: "Judicial Separation in Lucknow: Is Living Apart the Same as Separation?",
        description:
          "The difference between simply living apart, a court order of judicial separation and a divorce, whether the marriage continues in each case, and when separation can lead to divorce.",
        summary:
          "The difference between simply living apart, a court order of judicial separation and a divorce, and whether the marriage continues.",
        linkLabel: "Read the judicial separation guide",
        lead:
          "&ldquo;We are living apart. Are we legally separated?&rdquo; Not in the eyes of the law. Living apart is a fact; judicial separation is a court order; divorce ends the marriage. This page explains what each means and what happens to the marriage in each case.",
        sections: [
          {
            id: "three-situations",
            heading: "Living apart, judicial separation and divorce compared",
            paras: [
              "People often describe themselves as &ldquo;separated&rdquo; when they have simply stopped living together. That has legal consequences &mdash; it is, for example, the starting point for a mutual consent divorce &mdash; but it is not a legal status. The table sets out the three situations."
            ],
            table: {
              caption: "What each situation means",
              head: ["", "Living apart", "Judicial separation", "Divorce"],
              rows: [
                ["What it is", "A fact: the spouses no longer live as husband and wife", "A court decree that the spouses are no longer obliged to live together", "A court decree dissolving the marriage"],
                ["Does the marriage continue?", "Yes", "Yes", "No"],
                ["Can either spouse remarry?", "No", "No", "Yes, once the decree is final"],
                ["Court involved?", "No", "Yes, on a petition and a proved ground", "Yes"],
                ["Can it lead to divorce?", "One year of separation is a condition for mutual consent divorce", "If the spouses do not resume living together for one year after the decree, either may seek divorce", "&mdash;"]
              ]
            }
          },
          {
            id: "what-it-is",
            heading: "What a decree of judicial separation does",
            paras: [
              "Under section 10 of the <strong>Hindu Marriage Act, 1955</strong> (and section 23 of the <strong>Special Marriage Act, 1954</strong>), either spouse may ask the court for judicial separation on any of the grounds on which a divorce could be sought. Once the decree is passed, the petitioner is no longer obliged to live with the other spouse.",
              "The marriage itself continues. Neither spouse can marry anyone else, and the rights that depend on the marriage &mdash; including maintenance and inheritance &mdash; continue unless and until a divorce decree is passed. The court can cancel the decree if the spouses reconcile and ask it to.",
              "Judicial separation suits people who want the legal recognition and protection of being apart but are not ready to end the marriage &mdash; for religious, family or personal reasons, or because they want time before a final decision."
            ]
          },
          {
            id: "to-divorce",
            heading: "When separation can become divorce",
            paras: [
              "If the spouses have not resumed living together for <strong>one year or more</strong> after a decree of judicial separation, either of them &mdash; including the spouse against whom the decree was passed &mdash; may petition for divorce on that ground alone. The question in that later petition is not who was at fault originally but whether cohabitation was resumed.",
              "Simply living apart without any decree does not, by itself, give a ground for contested divorce, although desertion for two years may, if its legal requirements are met. Where both spouses agree, one year of living apart is enough for a mutual consent petition."
            ]
          },
          {
            id: "documents",
            heading: "Document checklist",
            list: [
              "Proof of marriage",
              "A dated account of the events relied on as the ground (for example cruelty or desertion)",
              "Evidence of when and why the spouses began living apart: messages, letters, a change of address, police or medical records",
              "Proof of each spouse&rsquo;s current address",
              "Income and expense records if maintenance is to be claimed"
            ]
          }
        ],
        faqs: [
          [
            "Does a separation agreement signed by both of us count as judicial separation?",
            "No. A private agreement can record practical arrangements such as maintenance and the children, but judicial separation is a status that only a court decree creates."
          ],
          [
            "Can I claim maintenance after judicial separation?",
            "Yes. Because the marriage continues, the right to maintenance continues and can be claimed in the separation proceedings or separately."
          ],
          [
            "Is judicial separation available to Muslim spouses?",
            "Judicial separation is a remedy under the Hindu Marriage Act, the Special Marriage Act and the Divorce Act. Muslim personal law does not provide the same remedy, though a Muslim couple married under the Special Marriage Act can use it."
          ]
        ],
        related: [
          ["Contested Divorce", "family-law/contested-divorce/index.html"],
          ["Mutual Consent Divorce", "family-law/mutual-consent-divorce/index.html"],
          ["Restitution of Conjugal Rights", "family-law/restitution-of-conjugal-rights/index.html"],
          ["Maintenance &amp; Alimony", "family-law/maintenance/index.html"]
        ]
      }),

      /* ============================================================ */
      /* 5. ANNULMENT & NULLITY                                        */
      /* ============================================================ */
      article({
        slug: "marriage-annulment",
        navLabel: "Marriage Annulment & Nullity",
        name: "Marriage Annulment & Nullity in Lucknow",
        h1: "Marriage Annulment & Nullity: When a Marriage Is Void or Voidable",
        title: "Marriage Annulment in Lucknow: Void and Voidable Marriages",
        description:
          "How annulment differs from divorce, what it means to question the validity of a marriage, void and voidable marriages, time limits, and why the governing marriage law matters.",
        summary:
          "How annulment differs from divorce, and when a marriage can be declared void or set aside because it was never valid.",
        linkLabel: "Read the annulment and nullity guide",
        lead:
          "&ldquo;Our marriage should never have happened. Is that different from divorce?&rdquo; It can be. A divorce ends a valid marriage; annulment declares that a valid marriage never existed, or sets aside one that had a defect from the start. This page explains the difference and the time limits that apply.",
        sections: [
          {
            id: "difference",
            heading: "Annulment and divorce are different questions",
            paras: [
              "A divorce looks at what happened <em>after</em> the wedding &mdash; cruelty, desertion, and so on. A petition for <strong>nullity</strong> (often called annulment) looks at the position <em>at the time of</em> the wedding: was there a legal impediment, or a defect in consent, that meant the marriage was not valid?",
              "The answer depends on which law governs the marriage. A defect that makes a marriage void under one Act may not have the same effect under another. That is why the first question is always whether the marriage was solemnised under the Hindu Marriage Act, the Special Marriage Act or another personal law."
            ]
          },
          {
            id: "void",
            heading: "Void marriages",
            paras: [
              "A <strong>void</strong> marriage is treated as never having existed. Under section 11 of the <strong>Hindu Marriage Act, 1955</strong>, a marriage is void if, at the time of the marriage, either party had a living spouse, or the parties were within the prohibited degrees of relationship or were <em>sapindas</em> of each other (close relatives defined by the Act), unless a custom governing both of them permits the marriage. Either party may ask the court for a decree declaring the marriage void.",
              "Under the <strong>Special Marriage Act, 1954</strong> (section 24), a marriage is void if any of the conditions for marriage under the Act were not met &mdash; for example if either party had a living spouse, was under age, or was within the prohibited degrees &mdash; or if the respondent was impotent at the time of the marriage and at the time of the petition."
            ]
          },
          {
            id: "voidable",
            heading: "Voidable marriages",
            paras: [
              "A <strong>voidable</strong> marriage is valid until a court sets it aside on a petition by the affected spouse. Under section 12 of the Hindu Marriage Act, the grounds include:"
            ],
            list: [
              "the marriage has not been consummated because of the respondent&rsquo;s impotence",
              "the respondent, at the time of the marriage, was incapable of giving valid consent because of unsoundness of mind, or suffered from a mental disorder making them unfit for marriage",
              "the petitioner&rsquo;s consent, or that of a guardian where it was required, was obtained by force or by fraud about the nature of the ceremony or a material fact or circumstance concerning the respondent",
              "the respondent was, at the time of the marriage, pregnant by someone other than the petitioner"
            ],
            after: [
              "There are strict conditions. A petition on the ground of force or fraud must be presented within <strong>one year</strong> after the force ceased or the fraud was discovered, and is not allowed if the petitioner lived with the other spouse as husband or wife with full consent after that. A petition on the ground of pregnancy has its own conditions as to the petitioner&rsquo;s knowledge and the time of filing. The Special Marriage Act (section 25) has comparable provisions."
            ]
          },
          {
            id: "children",
            heading: "What happens to children of a void or voidable marriage",
            paras: [
              "The law protects children of such marriages. Under section 16 of the Hindu Marriage Act, a child of a void or voidable marriage is legitimate, whether born before or after the decree. Such a child has rights in the property of the parents. The court can also make orders about custody and maintenance in the nullity proceedings."
            ]
          },
          {
            id: "documents",
            heading: "Document checklist",
            list: [
              "Proof of the marriage and its date",
              "Evidence of the defect relied on: proof of an earlier marriage, of age, of the relationship between the parties, or medical evidence",
              "For force or fraud: when the force ceased or the fraud was discovered, and how; messages and documents that show it",
              "Birth certificates of any children"
            ]
          }
        ],
        faqs: [
          [
            "My spouse was already married when we married. What can I do?",
            "Under the Hindu Marriage Act and the Special Marriage Act, a marriage with a person who had a living spouse is void. You can ask the court to declare it void. Bigamy is also an offence, and maintenance and other rights may still be available depending on the facts."
          ],
          [
            "Is there a time limit for annulment?",
            "For a void marriage there is no fixed period within which the declaration must be sought. For a voidable marriage on the ground of force or fraud, the petition must be presented within one year of the force ceasing or the fraud being discovered."
          ],
          [
            "Can a Muslim marriage be annulled?",
            "Muslim law distinguishes between a marriage that is void (<em>batil</em>) and one that is irregular (<em>fasid</em>), and the consequences differ. The question is answered under Muslim personal law, not the Hindu Marriage Act, unless the marriage was solemnised under the Special Marriage Act."
          ]
        ],
        related: [
          ["Contested Divorce", "family-law/contested-divorce/index.html"],
          ["Court Marriage &amp; Marriage Registration", "family-law/court-marriage-registration/index.html"],
          ["Child Custody &amp; Visitation", "family-law/child-custody/index.html"]
        ]
      }),

      /* ============================================================ */
      /* 6. RESTITUTION OF CONJUGAL RIGHTS                             */
      /* ============================================================ */
      article({
        slug: "restitution-of-conjugal-rights",
        navLabel: "Restitution of Conjugal Rights",
        name: "Restitution of Conjugal Rights in Lucknow",
        h1: "Restitution of Conjugal Rights: What the Petition Asks and What an Order Means",
        title: "Restitution of Conjugal Rights: Petition, Notice and Effect of an Order",
        description:
          "Restitution of conjugal rights in plain English: what the petition asks a court to do, what to check if you receive a notice, and what an order means in practice.",
        summary:
          "What a petition asking a spouse to return home actually asks the court to do, and what an order means in practice.",
        linkLabel: "Read the restitution of conjugal rights guide",
        lead:
          "&ldquo;My spouse has left home. Can the court make them come back?&rdquo; Not by force. A petition for restitution of conjugal rights asks the court to direct a spouse who has withdrawn from the marriage without reasonable excuse to resume living together. This page explains what that means and what an order can and cannot do.",
        sections: [
          {
            id: "meaning",
            heading: "What the term means in everyday language",
            paras: [
              "&ldquo;Conjugal rights&rdquo; are the rights husband and wife have to each other&rsquo;s company &mdash; to live together as a married couple. &ldquo;Restitution&rdquo; means restoring them. Under section 9 of the <strong>Hindu Marriage Act, 1955</strong> (and section 22 of the <strong>Special Marriage Act, 1954</strong>), when one spouse has withdrawn from the other&rsquo;s society without reasonable excuse, the other may petition the court for restitution of conjugal rights.",
              "The court grants the petition if it is satisfied that the statements in it are true and there is no legal ground to refuse. Once the petitioner shows that the other spouse has withdrawn, the burden is on that spouse to prove a <strong>reasonable excuse</strong>."
            ]
          },
          {
            id: "received-notice",
            heading: "If you have received a notice of this petition",
            list: [
              "<strong>Check what is alleged:</strong> when and how you are said to have withdrawn from the marriage.",
              "<strong>Gather the reasons you left, with evidence.</strong> Cruelty, harassment, a dowry demand, an unsafe home, or the other spouse&rsquo;s own conduct can amount to a reasonable excuse. Messages, medical or police records and witnesses matter.",
              "<strong>Consider related claims.</strong> A respondent who left because of cruelty or harassment may also have claims for maintenance, protection under the domestic violence law, or the return of belongings.",
              "<strong>Appear on the date.</strong> As with any case, failing to appear allows the court to proceed without hearing you.",
              "<strong>Be aware of what follows.</strong> These petitions are sometimes filed as a step towards a later divorce, because of the one-year rule explained below."
            ]
          },
          {
            id: "effect",
            heading: "What an order means in practice",
            paras: [
              "An order for restitution of conjugal rights is a direction to resume living together. No court will physically compel a spouse to return home or to have a relationship, and the decree cannot be enforced by sending the spouse to prison. The law allows only limited means of enforcement, such as attachment of property.",
              "The practical significance of the order lies elsewhere. If there is no restitution of conjugal rights for <strong>one year or more</strong> after the decree, either spouse &mdash; including the one against whom the decree was passed &mdash; may petition for divorce on that ground. Failure to comply with the order may also be considered by a court deciding maintenance."
            ]
          },
          {
            id: "documents",
            heading: "Document checklist",
            list: [
              "Proof of marriage",
              "A dated account of when and how the spouses began living apart",
              "Messages, letters or notices asking the other spouse to return, and any replies",
              "Evidence relevant to any excuse claimed: medical, police or other records",
              "Details of any other proceedings between the spouses"
            ]
          }
        ],
        faqs: [
          [
            "Can a wife file for restitution of conjugal rights?",
            "Yes. Either spouse may file. The remedy is not limited to husbands."
          ],
          [
            "If I return after the order, does the case end?",
            "If the spouses resume living together, the order has served its purpose, and the one-year period that would allow a divorce on that ground does not continue to run."
          ],
          [
            "Is the remedy constitutionally valid?",
            "It remains in force. Its constitutional validity has been challenged before the Supreme Court, and the position should be checked when a petition is filed or contested."
          ]
        ],
        related: [
          ["Judicial Separation", "family-law/judicial-separation/index.html"],
          ["Contested Divorce", "family-law/contested-divorce/index.html"],
          ["Domestic Violence &amp; Protection Orders", "family-law/domestic-violence/index.html"],
          ["Maintenance &amp; Alimony", "family-law/maintenance/index.html"]
        ]
      }),

      /* ============================================================ */
      /* 7. MAINTENANCE & ALIMONY                                      */
      /* ============================================================ */
      article({
        slug: "maintenance",
        navLabel: "Maintenance & Alimony",
        name: "Maintenance & Alimony in Lucknow",
        h1: "Maintenance & Alimony: Interim, Permanent and Child Maintenance",
        title: "Maintenance & Alimony in Lucknow: Interim, Permanent and Child Support",
        description:
          "Interim maintenance, permanent alimony and child maintenance explained: which law applies, the income and expense records courts expect, responding to an application, and changed circumstances or missed payments.",
        summary:
          "Interim and permanent maintenance for a spouse and children, the records courts expect, and what to do if payments stop.",
        linkLabel: "Read the maintenance and alimony guide",
        lead:
          "&ldquo;How will I and the children manage while this is going on, and afterwards?&rdquo; The law provides for maintenance during a case, for alimony when it ends, and for children throughout. This page explains the different claims, the records a court will ask for, and what to do if circumstances change or payments are missed.",
        sections: [
          {
            id: "kinds",
            heading: "The different kinds of maintenance",
            paras: [
              "<strong>Maintenance</strong> is money paid regularly by one person for another&rsquo;s living expenses. <strong>Alimony</strong> usually means the amount fixed for a spouse when a matrimonial case ends, either as a lump sum or as periodic payments. Several laws provide for these claims, and more than one may be used, although a court takes into account what has already been awarded in another proceeding."
            ],
            table: {
              caption: "Where maintenance can be claimed",
              head: ["Law", "Who can claim", "When"],
              rows: [
                ["Section 144, Bharatiya Nagarik Suraksha Sanhita, 2023 (formerly section 125, Code of Criminal Procedure)", "A wife unable to maintain herself, children, and parents", "At any time, before the Magistrate or Family Court, whether or not another case is pending"],
                ["Section 24, Hindu Marriage Act, 1955", "Either spouse without sufficient independent income", "While a matrimonial case is pending (maintenance and the costs of the case)"],
                ["Section 25, Hindu Marriage Act, 1955", "Either spouse", "When a decree is passed, or afterwards (permanent alimony)"],
                ["Sections 18 and 20, Hindu Adoptions and Maintenance Act, 1956", "A Hindu wife; children and aged parents", "As an independent claim"],
                ["Section 20, Protection of Women from Domestic Violence Act, 2005", "A woman facing domestic violence, and her children", "As monetary relief in a domestic violence application"],
                ["Sections 36 and 37, Special Marriage Act, 1954", "The wife (during the case and on the decree)", "In proceedings under that Act"]
              ]
            },
            after: [
              "The Supreme Court held in July 2024 (<em>Mohd. Abdul Samad v. State of Telangana</em>) that a Muslim woman, including a divorced Muslim woman, may also claim maintenance under the general provision now in section 144, in addition to her remedy under the Muslim Women (Protection of Rights on Divorce) Act, 1986."
            ]
          },
          {
            id: "interim-permanent-child",
            heading: "Interim maintenance, permanent alimony and child maintenance",
            list: [
              "<strong>Interim maintenance</strong> is paid while the case is being decided, so that the claimant is not left without support for its duration. It is decided on the affidavits and documents, without a full trial. Under section 144, an application for interim maintenance is to be decided, as far as possible, within sixty days of notice being served.",
              "<strong>Permanent alimony</strong> is fixed when a divorce or other decree is passed, taking into account each spouse&rsquo;s income and property, their conduct, the standard of living during the marriage, and other relevant circumstances. It can be a single settlement amount or a monthly payment.",
              "<strong>Child maintenance</strong> belongs to the child. It covers food, housing, clothing, schooling and medical needs, and is ordinarily paid to the parent with whom the child lives. Agreement between the parents does not take away the court&rsquo;s power to ensure that the child is provided for."
            ]
          },
          {
            id: "records",
            heading: "Income and expense records the court will expect",
            paras: [
              "The Supreme Court in <em>Rajnesh v. Neha</em> (2020) directed that in maintenance cases <strong>both</strong> parties file an affidavit disclosing their assets and liabilities, in a standard format, and that the respondent file the reply and affidavit within the time the court allows. A party who conceals income can face adverse consequences. Keep the following ready:"
            ],
            list: [
              "Salary slips, Form 16 and income-tax returns for the last few years",
              "Bank statements for all accounts",
              "Details of property, investments, vehicles, loans and EMIs",
              "Business records if self-employed: accounts, GST returns, ledgers",
              "Monthly expenses: rent, household costs, school fees, medical costs, with bills where possible",
              "Proof of the standard of living during the marriage"
            ]
          },
          {
            id: "responding",
            heading: "If you have received a maintenance application",
            list: [
              "Note the date of appearance and appear on it; orders can be passed in your absence.",
              "Prepare the affidavit of assets and liabilities fully and truthfully. Understating income is usually discovered through bank statements and tax records, and damages credibility on everything else.",
              "Set out your own expenses and responsibilities, such as dependent parents or loans, with documents.",
              "If you say the applicant has sufficient income of their own, produce evidence of it."
            ]
          },
          {
            id: "changes-and-defaults",
            heading: "If circumstances change or a payment is missed",
            paras: [
              "<strong>Change of circumstances.</strong> An order for maintenance is not fixed forever. Either party can ask the court to increase, reduce or cancel it if there is a change in circumstances &mdash; a job lost, a significant increase in income, remarriage, or a child coming of age. Under the Bharatiya Nagarik Suraksha Sanhita this is done under section 146 (formerly section 127 of the Code of Criminal Procedure).",
              "<strong>Missed payments.</strong> If the person ordered to pay fails to pay without sufficient cause, the claimant can apply to the court to recover the arrears. The court can issue a warrant to recover the amount as if it were a fine and, for each month of default, can order imprisonment for up to one month or until payment is made. The application must be made within <strong>one year</strong> from the date the amount became due, so arrears should not be allowed to build up. Keep a record of every payment received and every one missed."
            ]
          },
          {
            id: "documents",
            heading: "Document checklist",
            list: [
              "Proof of marriage and the children&rsquo;s birth certificates",
              "Your income documents and those you have of the other party",
              "A monthly budget with bills and receipts",
              "School fee receipts and medical bills for the children",
              "Copies of any earlier maintenance orders and a record of payments made and missed",
              "Details of any other case between the parties"
            ]
          }
        ],
        faqs: [
          [
            "Can a working wife claim maintenance?",
            "Earning an income does not by itself rule out maintenance. The question is whether the income is sufficient to maintain her in the standard of living the marriage provided. The court looks at both parties&rsquo; incomes and responsibilities."
          ],
          [
            "Can a husband claim maintenance?",
            "Under sections 24 and 25 of the Hindu Marriage Act, either spouse may claim. Section 144 of the Bharatiya Nagarik Suraksha Sanhita provides for a wife, children and parents, not a husband."
          ],
          [
            "From when is maintenance payable?",
            "The Supreme Court in Rajnesh v. Neha directed that maintenance be awarded from the date of the application. The amount is then calculated from that date even if the order is passed later."
          ],
          [
            "Does a lump-sum settlement end all future claims?",
            "A one-time permanent alimony amount agreed in a divorce and recorded by the court ordinarily settles the spouse&rsquo;s claim. Child maintenance is treated differently because the right belongs to the child."
          ]
        ],
        related: [
          ["Child Custody &amp; Visitation", "family-law/child-custody/index.html"],
          ["Domestic Violence &amp; Protection Orders", "family-law/domestic-violence/index.html"],
          ["Matrimonial Settlement Agreements", "family-law/matrimonial-settlement-agreement/index.html"],
          ["Mutual Consent Divorce", "family-law/mutual-consent-divorce/index.html"]
        ]
      }),

      /* ============================================================ */
      /* 8. CHILD CUSTODY & VISITATION                                 */
      /* ============================================================ */
      article({
        slug: "child-custody",
        navLabel: "Child Custody & Visitation",
        name: "Child Custody & Visitation in Lucknow",
        h1: "Child Custody & Visitation: Guardianship, Interim Arrangements and Contact",
        title: "Child Custody & Visitation in Lucknow: How Courts Decide",
        description:
          "Custody, guardianship, interim arrangements and visitation explained, with practical examples for school holidays, handovers and video calls, and how courts weigh the child's welfare.",
        summary:
          "Where the children live, how the other parent stays in touch, and how a court puts the child's welfare first.",
        linkLabel: "Read the child custody and visitation guide",
        lead:
          "&ldquo;Where will the children live, and how will they see the other parent?&rdquo; When parents separate, the law&rsquo;s first concern is the child&rsquo;s welfare, not the parents&rsquo; rights. This page explains custody, guardianship and visitation, and how arrangements work in practice.",
        sections: [
          {
            id: "terms",
            heading: "Custody, guardianship and visitation: what each means",
            list: [
              "<strong>Custody</strong> is about where the child lives day to day and who looks after them. One parent may have custody while the other has visitation, or the parents may share it.",
              "<strong>Guardianship</strong> is the legal authority to take decisions for the child and the child&rsquo;s property &mdash; schooling, medical treatment, travel and so on. A parent who does not have custody usually remains a guardian.",
              "<strong>Visitation</strong>, or access, is the time the child spends with the parent who does not have custody, and the contact they keep, including by telephone and video call."
            ],
            after: [
              "The <strong>Guardians and Wards Act, 1890</strong> applies to all communities. For Hindus, the <strong>Hindu Minority and Guardianship Act, 1956</strong> also applies, and in matrimonial cases the court can make custody orders under section 26 of the Hindu Marriage Act (section 38 of the Special Marriage Act)."
            ]
          },
          {
            id: "welfare",
            heading: "How courts consider the child&rsquo;s welfare",
            paras: [
              "Section 13 of the Hindu Minority and Guardianship Act makes the welfare of the child the <strong>paramount consideration</strong>, and the Guardians and Wards Act likewise directs the court to be guided by the child&rsquo;s welfare. In practice the court looks at:"
            ],
            list: [
              "the child&rsquo;s age, health and emotional needs",
              "who has been the main carer, and the stability of the child&rsquo;s present home and school",
              "each parent&rsquo;s capacity, availability and conduct towards the child",
              "the child&rsquo;s own preference, where the child is old enough to form an intelligent preference; judges often speak to the child in private",
              "keeping brothers and sisters together"
            ],
            after: [
              "The Hindu Minority and Guardianship Act provides that the custody of a child under five years ordinarily remains with the mother. That is a starting point, not a rule that overrides welfare. Neither parent has an automatic right to custody of an older child; nor does a parent&rsquo;s higher income decide the question."
            ]
          },
          {
            id: "interim",
            heading: "Interim arrangements while the case is pending",
            paras: [
              "Custody cases take time, and the child cannot wait. The court can make <strong>interim</strong> orders on where the child will live and how the other parent will have contact until the case is decided. Interim arrangements often shape the final one, because courts are reluctant to disturb a settled routine. It is therefore worth asking for interim contact early rather than waiting."
            ]
          },
          {
            id: "examples",
            heading: "Practical examples of visitation arrangements",
            paras: [
              "Visitation orders and agreements work best when they are specific. Some illustrations of the kind of terms parents and courts use:"
            ],
            table: {
              caption: "Examples of specific contact terms",
              head: ["Situation", "Example of a specific arrangement"],
              rows: [
                ["Weekends", "The child stays with the other parent from Saturday 10 a.m. to Sunday 6 p.m. on alternate weekends"],
                ["School holidays", "The summer vacation is divided in two halves, alternating each year; Diwali or Eid alternates between parents"],
                ["Handovers", "Handover at the gate of the child&rsquo;s school or another agreed neutral place, so that the parents do not need to meet inside each other&rsquo;s homes"],
                ["Video calls", "Fixed calls, for example at 7 p.m. on Wednesdays and Sundays for twenty minutes, without the other parent interrupting"],
                ["Birthdays and school events", "Both parents may attend school functions; the child spends part of the birthday with each parent"],
                ["Travel", "Neither parent takes the child outside India without the other&rsquo;s written consent or the court&rsquo;s permission; passports are kept as agreed"]
              ]
            },
            after: [
              "These are illustrations, not standard terms. The right arrangement depends on the child&rsquo;s age, school timings and the distance between homes."
            ]
          },
          {
            id: "documents",
            heading: "Document checklist",
            list: [
              "The child&rsquo;s birth certificate",
              "School records: admission, fee receipts, report cards, attendance",
              "Medical records and the name of the child&rsquo;s doctor",
              "Evidence of who has cared for the child day to day",
              "Details of each parent&rsquo;s home, work hours and support (for example grandparents)",
              "Any earlier custody or contact order, and a record of how it has been followed"
            ]
          }
        ],
        faqs: [
          [
            "Can I stop my spouse from seeing the children?",
            "Not on your own. Unless a court has restricted contact, both parents remain guardians and the child generally benefits from a relationship with both. If you have genuine concerns for the child&rsquo;s safety, raise them with the court, which can order supervised contact or other safeguards."
          ],
          [
            "Does the mother always get custody?",
            "No. For children under five the law favours custody with the mother, but in every case the court decides on the child&rsquo;s welfare, considering all the circumstances."
          ],
          [
            "What if the other parent does not follow the visitation order?",
            "Keep a dated record of each missed visit or call and any message exchanged. The court that made the order can be asked to enforce it, and persistent breach is relevant when custody is reconsidered."
          ]
        ],
        related: [
          ["Maintenance &amp; Alimony", "family-law/maintenance/index.html"],
          ["Family Court Mediation", "family-law/mediation/index.html"],
          ["Matrimonial Settlement Agreements", "family-law/matrimonial-settlement-agreement/index.html"],
          ["Domestic Violence &amp; Protection Orders", "family-law/domestic-violence/index.html"]
        ]
      }),

      /* ============================================================ */
      /* 9. DOMESTIC VIOLENCE & PROTECTION ORDERS                      */
      /* ============================================================ */
      article({
        slug: "domestic-violence",
        navLabel: "Domestic Violence & Protection Orders",
        name: "Domestic Violence & Protection Orders in Lucknow",
        h1: "Domestic Violence & Protection Orders: Applying and Responding",
        title: "Domestic Violence & Protection Orders in Lucknow: Relief and Procedure",
        description:
          "Protection orders, residence orders and monetary relief under the Domestic Violence Act, with guidance for a woman considering an application and for a person who has received notice of one.",
        summary:
          "Protection, residence and money orders under the domestic violence law, for someone considering an application or answering one.",
        linkLabel: "Read the domestic violence and protection orders guide",
        lead:
          "&ldquo;I am not safe at home. What can the law do now?&rdquo; The Protection of Women from Domestic Violence Act, 2005 lets a woman ask a Magistrate for orders that protect her, secure her right to live in the home, and provide money for her needs, quickly if necessary. If you are in immediate danger, call 112 first.",
        sections: [
          {
            id: "urgent",
            heading: "If you are in danger now",
            list: [
              "Call <strong>112</strong>, the national emergency number, and go to a safe place.",
              "If you are injured, get medical treatment and ask for the record to be kept; it may be important later.",
              "Free legal services are available to women regardless of income under the Legal Services Authorities Act, 1987. The " + nalsa + " runs a helpline on <strong>15100</strong>, and the District Legal Services Authority for Lucknow can arrange a lawyer."
            ]
          },
          {
            id: "what-counts",
            heading: "What the law treats as domestic violence",
            paras: [
              "The Act protects a woman who is or has been in a <strong>domestic relationship</strong> with the respondent &mdash; a wife, a woman in a relationship in the nature of marriage, a mother, sister, widow or daughter living in the same household. Domestic violence under the Act is not limited to physical violence. It includes:"
            ],
            list: [
              "<strong>physical abuse</strong> &mdash; hurting or endangering health or safety",
              "<strong>sexual abuse</strong>",
              "<strong>verbal and emotional abuse</strong> &mdash; insults, ridicule, name-calling, threats, including about not having a son",
              "<strong>economic abuse</strong> &mdash; depriving her of money or resources she is entitled to, disposing of her belongings or stridhan, or restricting her access to the household",
              "harassment to meet an unlawful demand for dowry or property"
            ]
          },
          {
            id: "relief",
            heading: "The orders a Magistrate can make",
            table: {
              caption: "Relief under the Protection of Women from Domestic Violence Act, 2005",
              head: ["Order", "What it does", "Section"],
              rows: [
                ["Protection order", "Prohibits the respondent from committing violence, contacting her, entering her workplace or the children&rsquo;s school, or operating joint accounts", "18"],
                ["Residence order", "Protects her right to live in the shared household; can stop her being dispossessed, or direct alternative accommodation", "19"],
                ["Monetary relief", "Covers expenses and losses: medical costs, loss of earnings, damaged property, maintenance for her and the children", "20"],
                ["Custody order", "Temporary custody of the children, with any arrangements for the respondent&rsquo;s contact", "21"],
                ["Compensation", "Compensation for injuries, including mental torture and emotional distress", "22"],
                ["Interim and ex parte orders", "Orders made urgently, before the case is decided, and if necessary without first hearing the respondent", "23"]
              ]
            },
            after: [
              "Breach of a protection order, or an interim protection order, is an offence under section 31 of the Act. The full text of the Act is on " + indiaCode + "."
            ]
          },
          {
            id: "considering",
            heading: "If you are considering an application",
            list: [
              "The application is made to the <strong>Magistrate</strong> where you live (even temporarily), where the respondent lives, or where the violence took place.",
              "A <strong>Protection Officer</strong>, appointed by the State Government for the district, can help you record a Domestic Incident Report and file the application, and can arrange shelter and medical help. The court, the police or the legal services authority can put you in touch.",
              "Write down incidents with dates, and keep messages, photographs and medical records somewhere the respondent cannot reach them.",
              "Applying under the Act does not prevent a criminal complaint, a maintenance claim or a divorce case; the remedies can run together."
            ]
          },
          {
            id: "responding",
            heading: "If you have received notice of an application",
            list: [
              "Read the application and any interim order carefully. If a protection or residence order has been made, <strong>comply with it</strong> even if you dispute the allegations: breach is an offence.",
              "Appear on the date given. The Magistrate can proceed in your absence.",
              "File a reply that answers each allegation specifically, with your own evidence. Bare denials carry little weight.",
              "Keep any contact with the applicant within what the order allows, and in writing where possible."
            ]
          },
          {
            id: "documents",
            heading: "Document checklist",
            list: [
              "A dated list of incidents",
              "Photographs of injuries and damage; medical records and prescriptions",
              "Messages, emails, call records and recordings",
              "Any police complaint or Domestic Incident Report",
              "Proof of marriage or of the relationship, and of the shared household",
              "Income and expense records for monetary relief",
              "Names of witnesses"
            ]
          }
        ],
        faqs: [
          [
            "Can I be removed from the matrimonial home?",
            "The Act gives a woman in a domestic relationship the right to reside in the shared household, whether or not she has any title in it, and allows the Magistrate to restrain anyone from dispossessing her, subject to the provisions of the Act."
          ],
          [
            "Is a domestic violence case the same as a police case?",
            "No. An application under the Act asks the Magistrate for civil remedies &mdash; protection, residence, money. A criminal complaint of cruelty is a separate matter investigated by the police. Both can be pursued."
          ],
          [
            "Does the Act protect women in live-in relationships?",
            "It protects women in a &ldquo;relationship in the nature of marriage&rdquo;. Whether a particular relationship qualifies depends on its facts, such as its duration, a shared household and how the couple presented themselves."
          ]
        ],
        related: [
          ["Dowry Harassment &amp; Matrimonial Cruelty", "family-law/dowry-harassment-cruelty/index.html"],
          ["Maintenance &amp; Alimony", "family-law/maintenance/index.html"],
          ["Stridhan &amp; Return of Jewellery", "family-law/stridhan-recovery/index.html"],
          ["Child Custody &amp; Visitation", "family-law/child-custody/index.html"]
        ]
      }),

      /* ============================================================ */
      /* 10. DOWRY HARASSMENT & MATRIMONIAL CRUELTY                    */
      /* ============================================================ */
      article({
        slug: "dowry-harassment-cruelty",
        navLabel: "Dowry Harassment & Matrimonial Cruelty",
        name: "Dowry Harassment & Matrimonial Cruelty in Lucknow",
        h1: "Dowry Harassment & Matrimonial Cruelty: Complaints, FIRs and Responding",
        title: "Dowry Harassment & Cruelty Cases in Lucknow: BNS and IPC Explained",
        description:
          "Complaints and FIRs for matrimonial cruelty and dowry, police notices, responding to allegations, and why case papers may cite IPC or BNS sections depending on the date.",
        summary:
          "Complaints and FIRs for cruelty and dowry demands, police notices, responding to allegations, and old versus new section numbers.",
        linkLabel: "Read the dowry harassment and cruelty guide",
        lead:
          "&ldquo;The police have registered a cruelty case &mdash; what do the sections mean and what happens next?&rdquo; Matrimonial cruelty and dowry demands are criminal offences. This page explains complaints and FIRs, police notices, responding to allegations, and why some papers cite the Indian Penal Code and others the Bharatiya Nyaya Sanhita.",
        sections: [
          {
            id: "old-new",
            heading: "Why case papers use old or new section numbers",
            paras: [
              "On <strong>1 July 2024</strong> the Bharatiya Nyaya Sanhita, 2023 (BNS) replaced the Indian Penal Code, 1860, and the Bharatiya Nagarik Suraksha Sanhita, 2023 (BNSS) replaced the Code of Criminal Procedure, 1973. Offences committed before that date are charged under the IPC; offences committed on or after it, under the BNS. Proceedings that were already pending continue under the old procedure. So a case about events in 2023 may cite section 498A IPC, and one about events in 2025 section 85 BNS, although the conduct is the same."
            ],
            table: {
              caption: "Main provisions, old and new",
              head: ["Subject", "Before 1 July 2024", "From 1 July 2024"],
              rows: [
                ["Cruelty by husband or relatives", "Section 498A IPC", "Sections 85 (offence) and 86 (definition of cruelty) BNS"],
                ["Dowry death", "Section 304B IPC", "Section 80 BNS"],
                ["Criminal breach of trust (for example, keeping stridhan)", "Section 406 IPC", "Section 316 BNS"],
                ["Notice to appear before the police", "Section 41A CrPC", "Section 35(3) BNSS"],
                ["High Court&rsquo;s power to quash proceedings", "Section 482 CrPC", "Section 528 BNSS"]
              ]
            },
            after: [
              "The <strong>Dowry Prohibition Act, 1961</strong> was not replaced and continues to apply. It makes giving, taking and demanding dowry offences. The cruelty provision carries imprisonment of up to three years and a fine; dowry death carries a minimum of seven years. Statutory texts are on " + indiaCode + "."
            ]
          },
          {
            id: "complaint",
            heading: "Making a complaint",
            list: [
              "A complaint of cruelty or dowry harassment can be made at the police station with jurisdiction, in writing. If the police do not act, the law provides further routes: a complaint to the Superintendent of Police, or an application to the Magistrate.",
              "Describe each incident with its date, place, who was involved and what was said or done. General statements against every family member without specific facts are treated with caution by courts.",
              "Keep copies of everything you submit, and of the FIR or receipt you are given."
            ]
          },
          {
            id: "cooling",
            heading: "The cooling period and Family Welfare Committees in Uttar Pradesh",
            paras: [
              "In Uttar Pradesh, the Allahabad High Court laid down guidelines in 2022 (<em>Mukesh Bansal v. State of U.P.</em>) for cases under the cruelty provision where the other offences alleged carry less than ten years&rsquo; imprisonment and there is no injury. Under those guidelines no arrest or coercive action is to be taken for <strong>two months</strong> after the FIR or complaint, and the matter is referred to the <strong>Family Welfare Committee</strong> of the district during that period. The Supreme Court endorsed these guidelines in July 2025 (<em>Shivangi Bansal v. Sahib Bansal</em>) and directed that they be implemented.",
              "The cooling period is not a decision on the merits, and it does not stop a complaint being registered. It gives the parties and the Committee time before the police take coercive steps."
            ]
          },
          {
            id: "responding",
            heading: "If you have received a police notice or are named in an FIR",
            list: [
              "Read the notice for the date, time and place you are asked to appear. A notice under section 35(3) BNSS (formerly 41A CrPC) requires you to appear; complying with it is important.",
              "Get a copy of the FIR. Check which sections are invoked and whether the events alleged are before or after 1 July 2024.",
              "Do not contact the complainant to pressure or argue; it can be treated as intimidation.",
              "Collect documents that answer the allegations: messages, bank records, travel records showing where you were, and names of witnesses.",
              "Depending on the facts, anticipatory bail, a challenge in the High Court, or settlement through mediation may be options. A settlement does not end a cruelty case by itself, because the offence cannot be compounded by the parties; the usual route after settlement is an application to the High Court to quash the proceedings."
            ]
          },
          {
            id: "documents",
            heading: "Document checklist",
            list: [
              "The complaint, FIR and any notice received",
              "Proof of marriage and the date of the events",
              "Messages, emails, call records and recordings",
              "Medical records, if any",
              "Lists of dowry items or demands, with any supporting proof",
              "Bank statements showing payments made or demanded",
              "Names and contact details of witnesses"
            ]
          }
        ],
        faqs: [
          [
            "Can relatives of the husband be named in a cruelty case?",
            "The offence covers the husband and his relatives. Courts have repeatedly cautioned against naming relatives without specific allegations against each of them, and proceedings against relatives with only general allegations have been quashed."
          ],
          [
            "Is a dowry demand made after the marriage still dowry?",
            "Yes. Under the Dowry Prohibition Act, dowry covers property or valuable security given or agreed to be given in connection with the marriage, before, at or at any time after it."
          ],
          [
            "Can the complainant withdraw the case?",
            "The cruelty offence cannot be withdrawn simply by agreement between the parties. Where they settle, the usual course is to ask the High Court to quash the proceedings on the basis of the settlement; whether it does so is for the court."
          ]
        ],
        related: [
          ["Domestic Violence &amp; Protection Orders", "family-law/domestic-violence/index.html"],
          ["Stridhan &amp; Return of Jewellery", "family-law/stridhan-recovery/index.html"],
          ["Matrimonial Settlement Agreements", "family-law/matrimonial-settlement-agreement/index.html"],
          ["Family Court Mediation", "family-law/mediation/index.html"]
        ]
      }),

      /* ============================================================ */
      /* 11. STRIDHAN & RETURN OF JEWELLERY                            */
      /* ============================================================ */
      article({
        slug: "stridhan-recovery",
        navLabel: "Stridhan & Return of Jewellery",
        name: "Stridhan & Return of Jewellery in Lucknow",
        h1: "Stridhan & Return of Jewellery: Documenting and Recovering Belongings",
        title: "Stridhan Recovery in Lucknow: Jewellery, Gifts and Proof",
        description:
          "What stridhan is, how to document jewellery, gifts and belongings with a sample inventory, what to do when photographs exist but receipts do not, and the remedies for getting them back.",
        summary:
          "What counts as a woman's own property, how to list it with a sample inventory, and how to prove it without receipts.",
        linkLabel: "Read the stridhan recovery guide",
        lead:
          "&ldquo;My jewellery and wedding gifts are still at my in-laws&rsquo; house. How do I get them back?&rdquo; Property given to a woman before, at or after her marriage is her own. This page explains what stridhan is, how to document it, and the legal routes for its return.",
        sections: [
          {
            id: "meaning",
            heading: "What stridhan means",
            paras: [
              "<strong>Stridhan</strong> (literally &ldquo;a woman&rsquo;s property&rdquo;) is property given to a woman, before, at or after her marriage, by her parents, her in-laws, relatives or friends &mdash; jewellery, cash, clothes, household items and other gifts. It belongs to her absolutely, and remains hers even if it is kept in the custody of her husband or in-laws. Under the Hindu Succession Act, 1956, property held by a female Hindu is her absolute property.",
              "Holding a woman&rsquo;s stridhan and refusing to return it on demand can amount to the offence of criminal breach of trust (section 316 BNS, formerly section 406 IPC). The Dowry Prohibition Act, 1961 separately requires that any dowry received by anyone other than the woman be transferred to her."
            ]
          },
          {
            id: "routes",
            heading: "Ways to recover stridhan",
            list: [
              "<strong>A written demand</strong>, listing the items and asking for their return by a date. Keep proof of delivery.",
              "<strong>In matrimonial proceedings:</strong> section 27 of the Hindu Marriage Act allows the court to make orders about property presented at or about the time of the marriage that belongs jointly to the spouses.",
              "<strong>Under the domestic violence law:</strong> section 19(8) of the Protection of Women from Domestic Violence Act, 2005 allows the Magistrate to direct the return of stridhan or other property to which she is entitled.",
              "<strong>A criminal complaint</strong> for criminal breach of trust, where the items were entrusted and are dishonestly withheld.",
              "<strong>A civil suit</strong> for recovery of the items or their value.",
              "<strong>A settlement</strong>, in which the items are listed and returned on a fixed date in a recorded handover."
            ]
          },
          {
            id: "inventory",
            heading: "Sample inventory",
            paras: [
              "The single most useful step is a clear list. Courts and mediators work far more easily with an itemised inventory than with a general claim for &ldquo;all my jewellery&rdquo;. A sample format:"
            ],
            table: {
              caption: "Sample stridhan inventory",
              head: ["Item", "Given by", "Currently held by", "Supporting records"],
              rows: [
                ["Gold necklace set, about 40 g", "Parents, at the wedding", "Mother-in-law (kept in her locker)", "Wedding photographs showing the set; jeweller&rsquo;s bill"],
                ["Two pairs of gold bangles", "Maternal uncle", "Husband", "Photograph from the reception; uncle can confirm"],
                ["Cash, &#8377;1,00,000", "Father, by bank transfer", "Husband&rsquo;s account", "Bank statement showing the transfer"],
                ["Refrigerator and washing machine", "Parents", "Matrimonial home", "Purchase invoices; delivery address"],
                ["Silk sarees (12)", "In-laws and relatives", "Matrimonial home", "Photographs; list made at the time of the wedding"]
              ]
            },
            after: [
              "Add a column for the approximate value if you know it, and keep the list factual &mdash; describe each item as precisely as you can (weight, design, colour), so that it can be identified when returned."
            ]
          },
          {
            id: "no-receipts",
            heading: "When photographs exist but receipts do not",
            paras: [
              "This is the most common situation, because jewellery is often old, inherited, or bought years before the wedding. Lack of a receipt does not mean the claim fails; it means the proof comes from elsewhere. Useful evidence includes:"
            ],
            list: [
              "<strong>Wedding photographs and videos</strong> in which the jewellery is visible. Identify the photograph, the event and the item for each entry in the inventory.",
              "<strong>Lists made at the time</strong>, such as a gift register or a list of items sent with the bride.",
              "<strong>Testimony of the people who gave the items</strong> or who saw them given.",
              "<strong>Messages</strong> that refer to the items, for example a request to keep the jewellery in a locker, or an acknowledgement that it is with the in-laws.",
              "<strong>A jeweller&rsquo;s description or valuation</strong> made from the photographs.",
              "<strong>Bank records</strong> of money withdrawn or transferred around the time of the wedding."
            ]
          },
          {
            id: "documents",
            heading: "Document checklist",
            list: [
              "The itemised inventory described above",
              "Wedding photographs and videos, with the relevant frames identified",
              "Bills, invoices and bank records, where available",
              "Gift lists and any written acknowledgement of who holds the items",
              "Messages asking for the items and the replies",
              "Names of people who gave or saw the items"
            ]
          }
        ],
        faqs: [
          [
            "Is stridhan the same as dowry?",
            "No. Stridhan is a woman&rsquo;s own property, received as gifts. Dowry is property given or demanded in connection with the marriage as a consideration for it, which is unlawful. Whatever the label, items given to the woman are hers."
          ],
          [
            "My in-laws say the jewellery was given to the family, not to me. What decides it?",
            "Who the items were given to, and on what understanding, is a question of fact. Photographs showing you wearing them, the giver&rsquo;s evidence and contemporary messages are the usual proof. Items of personal jewellery given to the bride are ordinarily treated as hers."
          ],
          [
            "Can I claim stridhan in a mutual consent divorce?",
            "Yes. Its return is commonly one of the settlement terms, with an itemised list and a fixed handover date, and is recorded before the court with the divorce petition."
          ]
        ],
        related: [
          ["Domestic Violence &amp; Protection Orders", "family-law/domestic-violence/index.html"],
          ["Dowry Harassment &amp; Matrimonial Cruelty", "family-law/dowry-harassment-cruelty/index.html"],
          ["Matrimonial Settlement Agreements", "family-law/matrimonial-settlement-agreement/index.html"]
        ]
      }),

      /* ============================================================ */
      /* 12. FAMILY COURT MEDIATION                                    */
      /* ============================================================ */
      article({
        slug: "mediation",
        navLabel: "Family Court Mediation",
        name: "Family Court Mediation in Lucknow",
        h1: "Family Court Mediation: What Happens, How to Prepare and Possible Outcomes",
        title: "Family Court Mediation in Lucknow: Preparation and Outcomes",
        description:
          "What happens in family court mediation, how to prepare, which issues spouses can discuss, and what follows a full, partial or no agreement.",
        summary:
          "What happens in a mediation session, how to prepare, and what follows a full, partial or no agreement.",
        linkLabel: "Read the family court mediation guide",
        lead:
          "&ldquo;The court has sent us to mediation. What happens there?&rdquo; Mediation is a confidential meeting in which a trained mediator helps the spouses work out their own agreement. Nobody can be forced to agree. This page explains what happens, how to prepare, and what follows each possible outcome.",
        sections: [
          {
            id: "why",
            heading: "Why family cases go to mediation",
            paras: [
              "Section 9 of the <strong>Family Courts Act, 1984</strong> requires the Family Court to make efforts to persuade the parties to a settlement, and the Code of Civil Procedure provides for referral of disputes to mediation. Family courts commonly refer matrimonial disputes &mdash; divorce, maintenance, custody, domestic violence and related criminal matters &mdash; to the mediation centre attached to the court, usually at an early hearing. The Mediation Act, 2023 now also provides a statutory framework for mediation, and parts of it have been brought into force."
            ]
          },
          {
            id: "what-happens",
            heading: "What happens in a session",
            list: [
              "The mediator, usually an advocate or a retired judicial officer trained in mediation, explains the process and its confidentiality.",
              "Each spouse explains their position. The mediator often meets each separately as well as together.",
              "The mediator helps identify what each person actually needs &mdash; for example a secure income, time with the children, the return of belongings &mdash; and explores options. The mediator does not decide anything.",
              "Several sessions may be needed. Lawyers may attend or be consulted, depending on the centre&rsquo;s practice.",
              "What is said in mediation is confidential and cannot be used as evidence in court if the mediation fails."
            ]
          },
          {
            id: "issues",
            heading: "Which issues can be discussed",
            list: [
              "Whether the marriage will continue, and if not, whether the spouses will seek a mutual consent divorce",
              "Permanent alimony and maintenance, including amounts and payment dates",
              "Custody of the children, visitation, holidays, schooling and expenses",
              "Return of stridhan, jewellery and belongings",
              "Jointly owned property, loans and accounts",
              "What happens to all the other cases between the parties"
            ]
          },
          {
            id: "prepare",
            heading: "How to prepare",
            list: [
              "List what matters most to you, and what you could accept, before the first session.",
              "Bring a realistic monthly budget and income documents if money is in issue.",
              "Bring the stridhan inventory and supporting photographs if belongings are in issue.",
              "For children, think through a practical weekly and holiday schedule.",
              "Bring a list of all pending cases with their numbers, courts and next dates."
            ]
          },
          {
            id: "outcomes",
            heading: "Full, partial or no agreement",
            table: {
              caption: "What follows each outcome",
              head: ["Outcome", "What happens next"],
              rows: [
                ["Full agreement", "The terms are written down and signed by both parties and the mediator, and sent to the referring court. The court records them and passes orders or a decree in their terms, for example on a mutual consent divorce petition."],
                ["Partial agreement", "The agreed points are recorded and sent to the court, and the case continues only on the points that remain in dispute."],
                ["No agreement", "The mediator reports to the court that mediation did not succeed, without disclosing what was said. The case continues from where it was."]
              ]
            },
            after: [
              "See " + "<a href=\"../matrimonial-settlement-agreement/index.html\">Matrimonial Settlement Agreements</a> for how agreed terms are written and what they should cover."
            ]
          },
          {
            id: "documents",
            heading: "Document checklist",
            list: [
              "The court order referring the matter to mediation and the date of the first session",
              "Income documents and a monthly budget",
              "The children&rsquo;s school and medical details",
              "An inventory of stridhan and belongings",
              "A list of every pending case between the parties"
            ]
          }
        ],
        faqs: [
          [
            "Do I have to agree to anything in mediation?",
            "No. Attending is expected when the court refers the matter, but agreement is voluntary. If you do not agree, the case continues before the court."
          ],
          [
            "Is an agreement reached in mediation binding?",
            "Once it is signed and placed before the court, and the court records it and passes orders in its terms, it is enforceable like any other order. Before that, the parties should treat it as a draft and check every term carefully."
          ],
          [
            "Can mediation take place if there has been violence?",
            "Mediation depends on both parties being able to speak freely. Where there has been violence or there are safety concerns, tell the court and the mediator; separate sessions or other arrangements can be made, and mediation may not be appropriate at all."
          ]
        ],
        related: [
          ["Matrimonial Settlement Agreements", "family-law/matrimonial-settlement-agreement/index.html"],
          ["Mutual Consent Divorce", "family-law/mutual-consent-divorce/index.html"],
          ["Child Custody &amp; Visitation", "family-law/child-custody/index.html"],
          ["Maintenance &amp; Alimony", "family-law/maintenance/index.html"]
        ]
      }),

      /* ============================================================ */
      /* 13. MATRIMONIAL SETTLEMENT AGREEMENTS                         */
      /* ============================================================ */
      article({
        slug: "matrimonial-settlement-agreement",
        navLabel: "Matrimonial Settlement Agreements",
        name: "Matrimonial Settlement Agreements in Lucknow",
        h1: "Matrimonial Settlement Agreements: Recording Agreed Terms",
        title: "Matrimonial Settlement Agreements in Lucknow: A Practical Checklist",
        description:
          "How agreed terms between spouses are recorded, with a checklist covering payment amounts and dates, return of belongings, parenting arrangements and the steps needed in pending cases.",
        summary:
          "How agreed terms are written down and recorded, with a checklist covering money, belongings, children and pending cases.",
        linkLabel: "Read the settlement agreement guide and checklist",
        lead:
          "&ldquo;We have agreed. How do we make sure it actually happens?&rdquo; An agreement between spouses is only as good as the way it is written and recorded. This page explains how terms are recorded and gives a practical checklist of what a matrimonial settlement should cover.",
        sections: [
          {
            id: "how-recorded",
            heading: "How agreed terms are recorded",
            paras: [
              "A matrimonial settlement is usually reached in one of two ways: in court-referred <a href=\"../mediation/index.html\">mediation</a>, or in direct discussions between the spouses and their families. Either way, the terms are written into a <strong>settlement agreement</strong> signed by both spouses &mdash; and by anyone else who has to do something under it, such as in-laws returning jewellery.",
              "The agreement then needs to be placed before the court so that it becomes enforceable. A mediated settlement is sent to the referring court with the mediator&rsquo;s report. Where the spouses are divorcing, the terms are typically recorded in the <a href=\"../mutual-consent-divorce/index.html\">mutual consent divorce</a> petition and in their statements before the court, and the decree is passed on that basis.",
              "A private agreement that is never recorded by a court can be useful evidence, but it does not dissolve a marriage, and enforcing it can require a fresh case."
            ]
          },
          {
            id: "checklist",
            heading: "Settlement checklist",
            paras: [
              "Use this checklist to make sure nothing is left vague. Every obligation should say <strong>who</strong> does <strong>what</strong>, <strong>by when</strong>, and <strong>how</strong> it will be shown to have been done."
            ],
            table: {
              caption: "What a matrimonial settlement should cover",
              head: ["Subject", "What to write down"],
              rows: [
                ["Payment amounts", "The total amount, what it covers (alimony, maintenance, children, stridhan value), and that it is in full and final settlement of the spouse&rsquo;s claims, if that is intended"],
                ["Payment dates and mode", "Each instalment, its date or the event that triggers it (for example at the first motion and at the second motion), and the mode: demand draft or bank transfer, so there is a record"],
                ["Return of belongings", "An itemised list, the date and place of handover, who will be present, and a signed acknowledgement on receipt"],
                ["Parenting arrangements", "Where the children live, the weekly and holiday contact schedule, video calls, handover points, school fees and medical expenses, and consent for travel abroad"],
                ["Property and accounts", "Jointly owned property, joint accounts, loans and who pays them, and transfer steps with dates"],
                ["Pending cases", "Each case by court, number and stage, and the step each party will take: withdrawal, a joint application, a statement before the court, or an application to the High Court to quash a criminal case"],
                ["Future claims", "Whether the parties give up further claims against each other, and an undertaking not to file new cases on the same facts"],
                ["Default", "What happens if a payment is missed or a step is not taken, for example that the other party may ask the court to enforce the terms"]
              ]
            }
          },
          {
            id: "pending-cases",
            heading: "Steps required for pending cases",
            paras: [
              "Different cases end in different ways, and the agreement should say exactly how each will be dealt with."
            ],
            list: [
              "<strong>Divorce:</strong> a contested petition can be withdrawn, or converted into a joint petition for mutual consent divorce, with any request to waive the waiting period.",
              "<strong>Maintenance and domestic violence applications:</strong> usually withdrawn, or disposed of in terms of the settlement, by recording the parties&rsquo; statements.",
              "<strong>Criminal cases for cruelty:</strong> these cannot be compounded by the parties. The usual course after settlement is a joint application to the High Court to quash the proceedings under section 528 of the Bharatiya Nagarik Suraksha Sanhita (formerly section 482 of the Code of Criminal Procedure). Whether to quash is for the High Court, so the agreement should say what happens to the payment schedule if quashing is delayed or refused.",
              "<strong>Order of steps:</strong> link payments to steps, so that neither party is left exposed &mdash; for example, part of the amount at the first motion, the balance at the second motion or on quashing."
            ]
          },
          {
            id: "documents",
            heading: "Document checklist",
            list: [
              "A list of every pending case: court, case number, next date and stage",
              "Itemised list of belongings to be returned",
              "Bank details for payments",
              "Identity proof of everyone signing the agreement",
              "The children&rsquo;s school details and holiday calendar for parenting terms",
              "Any earlier orders on maintenance or custody"
            ]
          }
        ],
        faqs: [
          [
            "Can a settlement be changed later?",
            "Terms recorded by a court can be changed only by the court, and generally only for good reason. Terms about the children are always open to review in the child&rsquo;s interest. Payment terms agreed as a full and final settlement are ordinarily not reopened."
          ],
          [
            "Does the settlement agreement need to be on stamp paper or registered?",
            "Depending on its contents, particularly any transfer of immovable property, an agreement may require stamp duty and registration. The duty is fixed by the State and revised, so the current requirement should be checked for the particular agreement."
          ],
          [
            "What if the other side does not do what was agreed?",
            "If the terms have been recorded by the court, the court can be asked to enforce them. Linking each payment and step to a stage in the proceedings is the best protection against default."
          ]
        ],
        related: [
          ["Family Court Mediation", "family-law/mediation/index.html"],
          ["Mutual Consent Divorce", "family-law/mutual-consent-divorce/index.html"],
          ["Stridhan &amp; Return of Jewellery", "family-law/stridhan-recovery/index.html"],
          ["Child Custody &amp; Visitation", "family-law/child-custody/index.html"]
        ]
      })
    ]
  };
})();
