import React, { useState } from 'react';
import { SITE_CONFIG, ServiceItem } from '../../config/siteContent';
import { ArrowUpRight, Check, Clock, Briefcase } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'direct', label: 'Business Websites & Stores' },
    { id: 'apps', label: 'Full-Stack & Apps' },
    { id: 'agency', label: 'Agency & Support' },
  ];

  const filteredServices = SITE_CONFIG.services.filter((service) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'direct') {
      return (
        service.id === 'business-websites' ||
        service.id === 'landing-pages' ||
        service.id === 'ecommerce-development'
      );
    }
    if (selectedFilter === 'apps') {
      return service.id === 'full-stack-apps' || service.id === 'website-fixes';
    }
    if (selectedFilter === 'agency') {
      return service.id === 'agency-support' || service.id === 'ongoing-maintenance';
    }
    return true;
  });

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#141611] border-t border-[#272B22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-4">
            <div className="text-xs uppercase font-mono tracking-[0.25em] text-[#D6F36A]">
              DEVELOPMENT SERVICES
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F3ED] tracking-tight [text-wrap:balance]">
              Tailored development services for defined business requirements.
            </h2>
            <p className="text-base text-[#9E9E94] leading-relaxed">
              Every engagement starts with understanding your specific operational goal. Deliverables, scope, and technical boundaries are documented before work begins.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#11130F] rounded-lg border border-[#272B22] shrink-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedFilter(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                  selectedFilter === cat.id
                    ? 'bg-[#D6F36A] text-[#11130F] font-semibold'
                    : 'text-[#9E9E94] hover:text-[#F5F3ED]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onSelect={() => onSelectService(service.title)}
            />
          ))}
        </div>

        {/* Scope Clarity Disclosure */}
        <div className="mt-12 p-5 bg-[#181B15] border border-[#272B22] rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#9E9E94]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D6F36A] shrink-0" />
            <span>
              <strong>Scope transparency:</strong> Proposals detail included deliverables and explicit exclusions. Hosting, copywriting, and third-party API subscription fees are client responsibilities unless agreed otherwise.
            </span>
          </div>
          <button
            onClick={() => onSelectService('Not sure yet')}
            className="text-[#D6F36A] hover:underline font-semibold whitespace-nowrap shrink-0 flex items-center gap-1"
          >
            <span>Have custom requirements?</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};

interface ServiceCardProps {
  service: ServiceItem;
  onSelect: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect }) => {
  return (
    <div className="bg-[#181B15] border border-[#272B22] hover:border-[#383F32] rounded-xl p-6 flex flex-col justify-between transition-all duration-200">
      <div className="space-y-4">
        {/* Category & Badge */}
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono text-[11px] text-[#9E9E94] tracking-wider uppercase">
            {service.category}
          </span>
          <span className="text-[11px] font-mono text-[#D6F36A] flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{service.timelineGuide.split(' ')[1] || 'Agreed'}</span>
          </span>
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="text-xl font-bold text-[#F5F3ED] mb-2 leading-snug">
            {service.title}
          </h3>
          <p className="text-xs text-[#9E9E94] leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* The Problem Addressed */}
        <div className="p-3 bg-[#11130F] rounded-lg border border-[#272B22]/70 space-y-1">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#9E9E94]">
            Challenge Addressed
          </div>
          <p className="text-xs text-[#F5F3ED]/90 leading-relaxed">
            {service.problemSolved}
          </p>
        </div>

        {/* Deliverables List */}
        <div className="space-y-2 pt-1">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#9E9E94]">
            Included Deliverables
          </div>
          <ul className="space-y-1.5 text-xs text-[#9E9E94]">
            {service.typicalDeliverables.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#D6F36A] mt-0.5 shrink-0" />
                <span className="text-[#F5F3ED]/85">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Card Action */}
      <div className="pt-6 mt-6 border-t border-[#272B22] flex items-center justify-between">
        <div className="text-[11px] text-[#9E9E94] truncate max-w-[170px]" title={service.idealFor}>
          Ideal: <span className="text-[#F5F3ED]">{service.idealFor.split(',')[0]}</span>
        </div>
        <button
          type="button"
          onClick={onSelect}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#11130F] bg-[#D6F36A] hover:bg-[#c9e85e] rounded transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          <span>Enquire</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
