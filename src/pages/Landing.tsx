import { Link } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCheck,
  CircleCheck,
  Database,
  Layers,
  LockKeyhole,
  Network,
  Server,
  ShieldCheck,
  Terminal,
  Zap,
} from "lucide-react";
import { Header } from "../components/Header";
import { Chart, Logo, ServiceCard } from "../components/ui";
import {
  identity,
  institutionalNotice,
  duties,
  competenceNames,
  activityStatuses,
  attributionSource,
} from "../data/professional";
import { EmptyState } from "../components/ui";
export function Landing() {
  return (
    <>
      <Header />
      <main>
        <section className="hero" id="inicio">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="live-dot" /> PERFIL PROFISSIONAL · HU-UFPI
              </div>
              <h1>
                Analista de TI <br />
                <span>– Sistemas Operacionais</span>
              </h1>
              <p>
                Perfil profissional dedicado ao diagnóstico, administração,
                análise de desempenho e aperfeiçoamento de ambientes
                computacionais, em alinhamento às atribuições do emprego e às
                necessidades institucionais do HU-UFPI.
              </p>
              <dl className="professional-identity">
                <div>
                  <dt>Emprego</dt>
                  <dd>{identity.role}</dd>
                </div>
                <div>
                  <dt>Instituição</dt>
                  <dd>{identity.institution}</dd>
                </div>
                <div>
                  <dt>Unidade</dt>
                  <dd>{identity.unit}</dd>
                </div>
              </dl>
              <div className="hero-actions">
                <a href="#atribuicoes" className="button">
                  Conhecer atribuições <ArrowUpRight size={18} />
                </a>
                <a href="#competencias" className="button secondary">
                  Conhecer competências <ArrowRight size={18} />
                </a>
              </div>
              <div className="hero-checks">
                <span>
                  <Check size={15} /> Organização profissional
                </span>
                <span>
                  <Check size={15} /> Desenvolvimento contínuo
                </span>
              </div>
            </div>
            <div className="hero-visual">
              <div className="floating-label">
                <ShieldCheck size={18} />
                <span>Prevenção hoje. Continuidade amanhã.</span>
              </div>
              <div className="preview">
                <div className="preview-header">
                  <span>
                    <span className="mini-logo">
                      <Terminal size={15} />
                    </span>{" "}
                    Visão da infraestrutura
                  </span>
                  <span className="demo-tag">DEMONSTRAÇÃO</span>
                </div>
                <div className="preview-body">
                  <div className="between">
                    <div>
                      <small>STATUS DO AMBIENTE</small>
                      <h3>Tudo sob controle.</h3>
                    </div>
                    <span className="badge green">
                      <i />
                      Operacional
                    </span>
                  </div>
                  <div className="preview-metrics">
                    <div>
                      <span>
                        <Server size={15} /> Servidores
                      </span>
                      <strong>
                        24 <small>monitorados</small>
                      </strong>
                    </div>
                    <div>
                      <span>
                        <Activity size={15} /> Disponibilidade
                      </span>
                      <strong>
                        99,98<small>%</small>
                      </strong>
                    </div>
                    <div>
                      <span>
                        <Database size={15} /> Backups
                      </span>
                      <strong>
                        100<small>% verificados</small>
                      </strong>
                    </div>
                  </div>
                  <div className="between chart-title">
                    <span>Disponibilidade dos serviços</span>
                    <small>Últimos 7 dias</small>
                  </div>
                  <Chart compact />
                  <div className="preview-server">
                    <span>
                      <Server size={17} /> srv-app-prod-01
                    </span>
                    <span>Linux</span>
                    <span className="status-light">Operacional</span>
                  </div>
                  <div className="preview-server">
                    <span>
                      <Server size={17} /> srv-web-prod-01
                    </span>
                    <span>Windows</span>
                    <span className="status-light">Operacional</span>
                  </div>
                </div>
              </div>
              <div className="floating-success">
                <span>
                  <CheckCheck size={22} />
                </span>
                <div>
                  <strong>Backup concluído</strong>
                  <small>Integridade verificada com sucesso</small>
                </div>
                <small>agora</small>
              </div>
              <div className="visual-caption">
                <span className="live-dot" /> Infraestrutura fictícia para
                ilustração. Não representa o HU-UFPI.
              </div>
            </div>
          </div>
          <div className="container trust-strip">
            <span>
              CONTEXTO INSTITUCIONAL
              <br />
              <strong>HU-UFPI | HU Brasil/Ebserh</strong>
            </span>
            <div>
              <Terminal /> Linux & Windows
            </div>
            <div>
              <Network /> Redes & Conectividade
            </div>
            <div>
              <Layers /> Aplicações & Serviços
            </div>
            <div>
              <ShieldCheck /> Backup & Segurança
            </div>
          </div>
        </section>
        <section className="section container" id="atribuicoes">
          <div className="section-heading">
            <div>
              <div className="eyebrow">ESCOPO DO EMPREGO</div>
              <h2>
                Atribuições do emprego. <span>Referência profissional.</span>
              </h2>
              <p>
                Áreas de atuação previstas para o emprego, sem oferta de
                serviços comerciais.
              </p>
            </div>
            <a href={attributionSource} className="text-link">
              Consultar fonte institucional <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="services-grid">
            {duties.map((d) => (
              <ServiceCard key={d.title} {...d} />
            ))}
          </div>
        </section>
        <section id="atividades" className="process-section">
          <div className="container">
            <div className="eyebrow">ORGANIZAÇÃO E RASTREABILIDADE</div>
            <h2>Atividades profissionais</h2>
            <p>
              Espaço para atividades confirmadas pelo titular. Nenhuma execução
              é presumida.
            </p>
            <div className="steps professional-activity-types">
              {activityStatuses.map((title, i) => (
                <div key={title}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>Nenhum registro público confirmado.</p>
                </div>
              ))}
            </div>
            <p>
              Título, descrição, categoria técnica, data, situação, resultados e
              documentação associada compõem cada registro.
            </p>
          </div>
        </section>
        <section className="section container benefits" id="competencias">
          <div>
            <div className="eyebrow">CONHECIMENTO E APERFEIÇOAMENTO</div>
            <h2>
              Competências técnicas.
              <br />
              <span>Aprendizagem contínua.</span>
            </h2>
            <p>
              Áreas organizadas para cadastro pelo titular. Nenhum nível de
              conhecimento foi atribuído automaticamente. As classificações
              disponíveis são: em desenvolvimento, básico, intermediário e
              avançado.
            </p>
            <a href="#desenvolvimento" className="text-link">
              Conhecer o desenvolvimento profissional <ArrowRight size={18} />
            </a>
          </div>
          <div className="benefit-grid">
            {competenceNames.map((t) => (
              <div key={t}>
                <CircleCheck size={20} />
                <span>
                  {t}
                  <small className="competence-level">
                    Nível não informado
                  </small>
                </span>
              </div>
            ))}
          </div>
        </section>
        <section className="section container" id="projetos">
          <div className="section-heading">
            <div>
              <div className="eyebrow">ESTUDOS E MELHORIAS</div>
              <h2>Projetos e propostas</h2>
              <p>
                Iniciativas pessoais e propostas técnicas não representam
                automaticamente projetos oficiais da instituição.
              </p>
            </div>
          </div>
          <div className="panel">
            <EmptyState
              title="Nenhum projeto público confirmado"
              description="Cada proposta reúne problema, objetivo, solução, tecnologias, benefícios esperados e situação. A aprovação institucional deve ser documentada."
            />
          </div>
        </section>
        <section className="indicator-section">
          <div className="container">
            <div className="between">
              <h3>Indicadores de desenvolvimento profissional</h3>
              <span className="demo-tag">
                SEM HISTÓRICO PROFISSIONAL PRESUMIDO
              </span>
            </div>
            <div className="indicators">
              {[
                ["8", "Atribuições profissionais"],
                ["0", "Competências confirmadas"],
                ["0", "Capacitações publicadas"],
                ["0", "Atividades publicadas"],
                ["0", "Projetos publicados"],
                ["0", "Documentações publicadas"],
              ].map(([v, l]) => (
                <div key={l}>
                  <strong>{v}</strong>
                  <span>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="section container analyst" id="sobre">
          <div className="analyst-art">
            <div className="orbit">
              <Server size={48} />
            </div>
            <span>
              <Terminal /> Sistemas
            </span>
            <span>
              <Network /> Redes
            </span>
            <span>
              <Database /> Dados
            </span>
            <span>
              <Activity /> Desempenho
            </span>
          </div>
          <div>
            <div className="eyebrow">PERFIL PROFISSIONAL</div>
            <h2>Sobre o profissional</h2>
            <p>{identity.about}</p>
            <p>{identity.context}</p>
            <small>{identity.subtitle}</small>
          </div>
        </section>
        <section className="security-section" id="seguranca">
          <div className="container security-grid">
            <div>
              <span className="security-icon">
                <LockKeyhole size={28} />
              </span>
              <div className="eyebrow">SEGURANÇA E GOVERNANÇA</div>
              <h2>
                Confiança se constrói
                <br />
                com boas práticas.
              </h2>
              <p>
                Princípios que orientam cada análise, cada mudança e cada
                decisão operacional.
              </p>
            </div>
            <div className="security-principles">
              {[
                "Menor privilégio",
                "Rastreabilidade",
                "Registro de alterações",
                "Documentação",
                "Backups",
                "Segregação de ambientes",
                "Monitoramento",
                "Continuidade de serviços",
                "Gestão de riscos",
              ].map((t) => (
                <span key={t}>
                  <ShieldCheck size={18} />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>
        <section className="section container" id="desenvolvimento">
          <div className="section-heading">
            <div>
              <div className="eyebrow">APERFEIÇOAMENTO CONTÍNUO</div>
              <h2>Desenvolvimento profissional</h2>
              <p>
                Competência a desenvolver, curso, objetivo, progresso,
                evidências de aprendizagem e relação com as atribuições.
              </p>
            </div>
          </div>
          <div className="panel">
            <EmptyState
              title="Nenhuma capacitação pública confirmada"
              description="Cursos, experiências e certificações serão apresentados somente após confirmação pelo titular."
            />
          </div>
        </section>
        <section className="section container" id="contato">
          <div className="final-cta">
            <div>
              <div className="eyebrow">
                <Zap size={15} /> CONTATO PROFISSIONAL
              </div>
              <h2>Informações e contexto profissional.</h2>
              <p>
                Nenhum contato público foi cadastrado pelo titular. Este perfil
                não recebe chamados ou demandas institucionais.
              </p>
            </div>
            <Link to="/contato" className="button">
              Informações de contato <ArrowUpRight size={18} />
            </Link>
          </div>
        </section>
      </main>
      <footer className="footer container">
        <div className="footer-top">
          <Logo />
          <div>
            <a href="#inicio">Início</a>
            <a href="#atribuicoes">Atribuições</a>
            <Link to="/privacidade">Privacidade</Link>
            <Link to="/termos">Termos</Link>
            <Link to="/contato">Contato</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {identity.brand}. Perfil profissional.
          </span>
          <span>{institutionalNotice}</span>
        </div>
      </footer>
    </>
  );
}
